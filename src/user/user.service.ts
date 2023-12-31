import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    // Repository 구현 방법 1
    // Repository Class 구현 후 주입
    // 단점 테스트 어려움
    // constructor(private readonly userRepository: UserRepository) {}

    // Repository 구현 방법 12
    // Repository Class 구현 하지 않고 바로 Repository 주입
    // 단점 : 커스텀 불가능
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

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
            .select(['user.name', 'user.email', 'user.role'])
            .where(`user.name LIKE '%${name}%'`)
            .getMany();

        if (!users) {
            throw new NotFoundException("There's no user");
        }

        return users;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Number> {
        const updateResult: UpdateResult = await this.userRepository.update(
            { id: id },
            updateUserDto,
        );
        if (updateResult.affected === 0) {
            throw new BadRequestException('update failed');
        }

        return id;
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        const deleterResult = await this.userRepository.softDelete({ id });
        return deleterResult;
    }
}
