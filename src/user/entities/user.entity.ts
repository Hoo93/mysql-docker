import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import * as bcrypt from 'bcrypt';

export class User extends BaseTimeEntity {
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    password: string;

    @ApiProperty({ type: String })
    email: string;

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    static signup(
        name: string,
        password: string,
        email: string,
        createdAt: Date,
        updatedAt: Date,
    ): User {
        const user = new User();
        user.name = name;
        user.password = password;
        user.email = email;
        user.createdAt = createdAt;
        user.updatedAt = updatedAt;
        return user;
    }
}
