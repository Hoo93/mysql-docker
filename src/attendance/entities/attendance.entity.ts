import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from '../../BaseTimeEntity';
import { Attendee } from '../../attendee//entities/attendee.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Unique } from 'typeorm';
import { attendanceType } from '../attendanceType.enum';

@Unique(['title'])
@Entity({ schema: 'Attendance', name: 'Attendance' })
export class Attendance extends BaseTimeEntity {
    @ApiProperty({
        description: '출석부 제목',
        example: 'attendance title',
        minLength: 1,
        maxLength: 50,
    })
    @Column()
    title: string;

    @ApiProperty({
        description: '출석부 설명',
        example: 'this is attendance description',
        minLength: 1,
        maxLength: 50,
    })
    @Column()
    description: string;

    @ApiProperty({
        description: 'this is type of attendance',
        example: 'Weekend',
    })
    @Column({ type: 'enum', enum: attendanceType })
    type: attendanceType;

    @ManyToMany(() => User, (user) => user.attendances)
    @JoinTable()
    users: User[];

    @OneToMany(() => Attendee, (attendee) => attendee.attendance)
    attendees: Attendee[];

    @OneToMany(() => Comment, (comment) => comment.attendance)
    comments: Comment[];
}
