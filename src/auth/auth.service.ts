import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCredentialDto } from './dto/user.credential.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';
// import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<Number> {
        let { name, password, email } = createUserDto;
        const now = new Date();
        const user = User.signup(name, password, email, now, now);
        await user.hashPassword();

        try {
            const newUser = await this.userRepository.save(user);
            return newUser.id;
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

        if (!(await user.validatePassword(userCredentialDto.password))) {
            throw new UnauthorizedException('incorrect password');
        }

        return {
            accessToken: this.jwtService.sign(userCredentialDto),
        };
    }
}
