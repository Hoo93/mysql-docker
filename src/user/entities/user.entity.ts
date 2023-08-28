import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import * as bcrypt from 'bcrypt';
import { Column, Entity, Unique } from 'typeorm';
@Unique(['name'])
@Entity({ name: 'USER' })
export class User extends BaseTimeEntity {
    @ApiProperty({
        description: '회원 이름',
        example: '이상무',
        pattern: `/^[ㄱ-ㅎ가-힣a-zA-Z\s+]+$/`,
        maxLength: 20,
    })
    @Column({ type: 'varchar' })
    name: string;

    @ApiProperty({
        example: 'test password',
        description: '비밀번호',
        pattern: '/^(?=.*\\d)(?=.*[a-z])[a-z\\d]{8,20}$/',
        maxLength: 10,
    })
    @Column({ type: 'varchar' })
    password: string;

    @ApiProperty({ example: 'test@email.com', description: '이메일' })
    @Column({ type: 'varchar' })
    email: string;

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

    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
        return;
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
