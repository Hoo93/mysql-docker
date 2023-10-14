import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AttendanceService', () => {
    let attendanceService: AttendanceService;
    let attendanceRepository: Repository<Attendance>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AttendanceService,
                {
                    provide: getRepositoryToken(Attendance),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        findOneBy: jest.fn(),
                    },
                },
            ],
        }).compile();

        attendanceRepository = module.get<Repository<Attendance>>(getRepositoryToken(Attendance));
        attendanceService = new AttendanceService(attendanceRepository);
    });

    it('should be defined', () => {
        expect(attendanceService).toBeDefined();
    });
});
