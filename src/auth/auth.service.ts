import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCredentialDto } from './dto/user.credential.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<User> {
        let { name, password, email } = createUserDto;
        const now = new Date();
        const user = User.signup(name, password, email, now, now);
        await user.hashPassword();

        if (await this.userRepository.findOneBy({ name: user.name })) {
            throw new BadRequestException(`user name with ${createUserDto.name} already exist`);
        }

        try {
            return await this.userRepository.save(user);
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }

    async validateUser(userCredentialDto: UserCredentialDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findOneBy({ name: userCredentialDto.name });

        if (!user) {
            throw new UnauthorizedException(`User doesn't exist`);
        }

        if (!user.validatePassword(userCredentialDto.password)) {
            throw new UnauthorizedException('incorrect password');
        }

        return {
            accessToken: this.jwtService.sign(userCredentialDto),
        };
    }
}