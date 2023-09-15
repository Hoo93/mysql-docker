import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/BaseTimeEntity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, TableForeignKey } from 'typeorm';

@Entity()
export class Manager extends BaseTimeEntity {
    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    userId: User;

    @OneToMany(() => Attendance, (attendance) => attendance.manager)
    attendances: Attendance;
}
