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
        try {
            const updatedUser = await this.userService.updateUser(id, updateUserDto);
            return updatedUser;
        } catch (error) {
            console.error(error);
        }
    }

    @Get('/search/:name')
    async searchUserByName(@Param('name') name: string) {
        try {
            const users = await this.userService.searchUserByName(name);
            return users;
        } catch (error) {
            console.error(error);
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
}
