import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from './entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    sayHello() {
        return 'say hello';
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userService.updateUser(id, updateUserDto);
        return updatedUser;
    }

    @Get('/search/:name')
    async searchUserByName(@Param('name') name: string) {
        const users = await this.userService.searchUserByName(name);
        return users;
    }
}
