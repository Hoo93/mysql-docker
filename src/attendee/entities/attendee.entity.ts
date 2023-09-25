import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from '../../BaseTimeEntity';
import { Attendance } from '../../attendance/entities/attendance.entity';
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
