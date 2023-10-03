import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch('/:id')
    @ApiResponse({
        status: 200,
        description: 'user update success',
        type: Number,
    })
    async updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<Number> {
        try {
            const updatedUserId = await this.userService.updateUser(id, updateUserDto);
            return updatedUserId;
        } catch (error) {
            console.error(error);
        }
    }

    @Get('/search/:name')
    @ApiResponse({
        status: 200,
        description: 'user found with given name',
        type: User,
    })
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
