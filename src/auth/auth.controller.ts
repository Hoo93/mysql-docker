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
import { CreateAuthDto, UserCredentialDto } from './dto/user.credential.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
    async signin(@Body() userCredentialDto: UserCredentialDto) {
        return this.authService.create(createAuthDto);
    }
}
