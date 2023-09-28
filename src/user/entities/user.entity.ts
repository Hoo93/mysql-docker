import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from '../../BaseTimeEntity';
import * as bcrypt from 'bcrypt';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { UUID } from 'crypto';
@Unique(['name'])
@Entity({ schema: 'Attendance', name: 'User' })
export class User extends BaseTimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id;

    @ApiProperty({
        description: '회원 이름',
        example: 'test name',
        pattern: `/^[ㄱ-ㅎ가-힣a-zA-Z\s+]+$/`,
        maxLength: 10,
    })
    @Column({ type: 'varchar' })
    name: string;

    @ApiProperty({
        example: 'test password',
        description: '비밀번호',
        pattern: '/^(?=.*[a-zA-Z])(?=.*d)(?=.*[!@#$%^*])[A-Za-zd!@#$%^*]+$/',
        maxLength: 12,
    })
    @Column({ type: 'varchar' })
    password: string;

    @ApiProperty({
        description: '유저의 Role "User" 또는 "Admin"',
        example: 'User',
        maxLength: 12,
    })
    @Column({ type: 'enum', default: 'User', nullable: false })
    role: Role;

    @ApiProperty({ example: 'test@email.com', description: '이메일' })
    @Column({ type: 'varchar' })
    email: string;

    @ManyToMany(() => Attendance, (attendance) => attendance.users)
    @JoinTable()
    attendances: Attendance[];

    @ApiProperty({
        description: '유저의 refresh-token',
        example: 'refresh-token',
    })
    @Column({ type: 'text', nullable: true })
    refreshToken: string;

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
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}

enum Role {
    'User',
    'Admin',
}
