import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
    @ApiResponse({
        status: 200,
        description: 'user validate',
        type: Object,
    })
    async signin(@Body() userCredentialDto: UserCredentialDto): Promise<{ accessToken: string }> {
        try {
            return this.authService.validateUser(userCredentialDto);
        } catch (error) {
            console.error(error);
        }
    }

    @Post('/signup')
    @ApiResponse({
        status: 200,
        description: 'user signup',
        type: Number,
    })
    async signup(@Body() createUserDto: CreateUserDto): Promise<Number> {
        try {
            return this.authService.signup(createUserDto);
        } catch (error) {
            console.error(error);
        }
    }
}
