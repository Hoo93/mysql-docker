import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';

describe('User Entity', () => {
    let user: User;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [User],
        }).compile();
    });

    describe('signup', () => {
        it('should return new user', () => {
            const name = 'test name';
            const password = 'test password';
            const email = 'test@email.com';
            const now = new Date();

            const newUser = User.signup(name, password, email, now, now);

            expect(newUser).toBeInstanceOf(User);
            expect(newUser.name).toBe(name);
            expect(newUser.password).toBe(password);
            expect(newUser.email).toBe(email);
            expect(newUser.createdAt).toBe(now);
            expect(newUser.updatedAt).toBe(now);
        });
    });
});
