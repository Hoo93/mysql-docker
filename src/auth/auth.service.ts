import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, UserCredentialDto } from './dto/user.credential.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(
        userCredentialDto: UserCredentialDto,
    ): Promise<{ accessToken: string }> {
        const user = await this.userService.getUserByName(
            userCredentialDto.name,
        );

        if (!user) {
            throw new UnauthorizedException(
                `User with name ${userCredentialDto.name} doesn't exist`,
            );
        }

        if (user.name !== userCredentialDto.name) {
            throw new UnauthorizedException('The user name does not match.');
        }

        // TODO password encrypt and decrypt

        return {
            accessToken: this.jwtService.sign(userCredentialDto),
        };
    }
}
