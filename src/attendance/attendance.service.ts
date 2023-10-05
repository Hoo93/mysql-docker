import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
    ) {}

    async create(createAttendanceDto: CreateAttendanceDto) {
        return 'This action adds a new attendance';
    }

    findAll() {
        return `This action returns all attendance`;
    }

    findOne(id: number) {
        return `This action returns a #${id} attendance`;
    }

    update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
        return `This action updates a #${id} attendance`;
    }

    remove(id: number) {
        return `This action removes a #${id} attendance`;
    }
}
