import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException("There's no user");
        }
        return user;
    }

    async searchUserByName(name: string): Promise<User[]> {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .where(`user.name LIKE '${name}'`)
            .getMany();

        if (!users) {
            throw new NotFoundException("There's no user");
        }
        return users;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user: User = await this.getUserById(id);

        const updateResult: UpdateResult = await this.userRepository.update(
            { id: id },
            updateUserDto,
        );
        if (updateResult.affected === 0) {
            throw new BadRequestException('update failed');
        }

        return await this.getUserById(id);
    }
}
