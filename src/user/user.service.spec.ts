import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmOption } from 'src/dbms/typeorm.config';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { mock } from 'node:test';
// import * as jest from 'jest';

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

        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        // userService = module.get<UserService>(UserService);
        userService = new UserService(userRepository);
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

        it('ID 값으로 User를 조회한다.', async () => {
            let userId = 2;
            let user = User.signup(
                'test name',
                'test password',
                'test email',
                new Date(),
                new Date(),
            );
            user.id = userId;

            jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

            const foundUser = await userService.getUserById(userId);
            expect(foundUser).toBe(user);
        });
    });
});
