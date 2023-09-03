import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOption } from 'src/dbms/typeorm.config';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
    let service: UserService;
    let repository: UserRepository;
    let dataSource: DataSource;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, UserRepository, DataSource],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<UserRepository>(UserRepository);
        dataSource = module.get<DataSource>(DataSource);

        repository = new UserRepository(dataSource);
        service = new UserService(repository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
