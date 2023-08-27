import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUserByName(name: string) {
        return this.userRepository.findOneBy({ name });
    }

    async signUp(createUserDto: CreateUserDto) {
        const user = await this.userRepository.findOneBy({
            name: createUserDto.name,
        });

        if (user) {
            throw new BadRequestException(
                `user name with ${createUserDto.name} already exist`,
            );
        }
    }
}
