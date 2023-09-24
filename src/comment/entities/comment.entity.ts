import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ schema: 'Attendance', name: 'Comment' })
export class Comment extends BaseTimeEntity {
    @ApiProperty({
        description: 'this is comment on attendance',
        example: 'example comment',
    })
    @Column()
    content: string;

    @ManyToOne(() => Attendance, (attendance) => attendance.comments)
    attendance: Attendance;
}
