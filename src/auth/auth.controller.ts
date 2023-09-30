import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
    async signin(@Body() userCredentialDto: UserCredentialDto): Promise<{ accessToken: string }> {
        try {
            return this.authService.validateUser(userCredentialDto);
        } catch (error) {
            console.error(error);
        }
    }

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<Number> {
        try {
            return this.authService.signup(createUserDto);
        } catch (error) {
            console.error(error);
        }
    }
}
