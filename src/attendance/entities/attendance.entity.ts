import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Manager } from 'src/manager/entities/manager.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Attendance extends BaseTimeEntity {
    @ApiProperty({
        description: '출석부 이름',
        example: 'attendance title',
        minLength: 1,
        maxLength: 50,
    })
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    managers: User[];

    @ApiProperty()
    @Column()
    member: User[];

    @ApiProperty({
        description: '글 내용',
        example: 'this is board description',
        minLength: 1,
        maxLength: 50,
    })
    @Column()
    description: string;

    @ApiProperty({
        description: 'this is foreign key of category',
        example: 'board title',
    })
    @Column()
    categoryCode: string;

    @OneToMany(() => User, (user) => user.attendance)
    users: User[];

    @ManyToOne(() => Manager, (manager) => manager.attendances)
    manager: Manager;

    // TODO M:N 관계 해결 필요
    // manager / member 구별 필요
    // @ManyToOne(() => User, (manager) => manager.attendances)
    // manager: User;
}
