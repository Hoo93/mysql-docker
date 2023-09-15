import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from '../../BaseTimeEntity';
import * as bcrypt from 'bcrypt';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
@Unique(['name'])
@Entity({ schema: 'healthRecord', name: 'User' })
export class User extends BaseTimeEntity {
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

    @OneToMany(() => Board, (board) => board.user)
    boards: Board[];

    @ManyToOne(() => Attendance, (attendance) => attendance.users)
    attendance: Attendance;

    // TODO M:N 관계 해결 필요
    // manager / member 구별 필요

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
