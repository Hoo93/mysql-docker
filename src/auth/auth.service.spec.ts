import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

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
        expect(service).toBeDefined();
    });
});
