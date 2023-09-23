import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Column, ManyToOne } from 'typeorm';

export class Comment extends BaseTimeEntity {
    @ApiProperty({
        description: 'this is comment on attendance',
        example: 'example comment',
    })
    @Column()
    content: string;

    @ManyToOne((type) => Attendance, (attendance) => attendance.comments)
    attendance: Attendance;
}
