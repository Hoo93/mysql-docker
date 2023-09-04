import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmOption } from 'src/dbms/typeorm.config';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

const mockRepository = () => ({
    findOneBy: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
});

describe('UserService', () => {
    let service: UserService;
    let userRepositoryToken: string | Function = getRepositoryToken(User);
    let repository: MockRepository<User>;
    let dataSource: DataSource;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: userRepositoryToken,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
