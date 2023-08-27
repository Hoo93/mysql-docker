import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCredentialDto } from './dto/user.credential.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<User> {
        const user = createUserDto.toEntity();
        user.hashPassword();

        if (await this.userRepository.findOneBy({ name: user.name })) {
            throw new BadRequestException(`user name with ${createUserDto.name} already exist`);
        }

        return await this.userRepository.save(user);
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
