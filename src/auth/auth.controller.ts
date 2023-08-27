import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user.credential.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
    async signin(@Body() userCredentialDto: UserCredentialDto) {
        return this.authService.validateUser(userCredentialDto);
    }

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }
}
