import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Attendee } from 'src/attendee/entities/attendee.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

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

    @ManyToMany(() => User, (user) => user.attendances)
    @JoinTable()
    users: User[];

    @OneToMany(() => Attendee, (attendee) => attendee.attendance)
    attendees: Attendee[];

    @OneToMany(() => Comment, (comment) => comment.attendance)
    comments: Comment[];

    // TODO M:N 관계 해결 필요
    // manager / member 구별 필요
    // @ManyToOne(() => User, (manager) => manager.attendances)
    // manager: User;
}
