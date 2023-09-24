import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
@Entity({ schema: 'Attendance', name: 'Attendee' })
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

    @ManyToOne(() => Attendance, (attendance) => attendance.attendees)
    attendance: Attendance;
}
