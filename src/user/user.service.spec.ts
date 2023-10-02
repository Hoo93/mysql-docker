import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmOption } from 'src/dbms/typeorm.config';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        findOneBy: jest.fn(),
                    },
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('getUserById', () => {
        beforeEach(() => {
            let user = User.signup(
                'test name',
                'test password',
                'test email',
                new Date(),
                new Date(),
            );
            user.id = 1;
        });
        it('should be a function', () => {
            expect(typeof userService.getUserById).toBe('function');
        });
    });
});
