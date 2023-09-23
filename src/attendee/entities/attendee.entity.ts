import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne } from 'typeorm';

export class Attendee extends BaseTimeEntity {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    attendanceDate: String;

    @ApiProperty()
    @Column()
    birth: String;

    @ManyToOne((type) => Attendance, (attendance) => attendance.attendees)
    attendance: Attendance;
}
