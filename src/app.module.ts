import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmOption } from './dbms/typeorm.config';
import { BoardModule } from './board/board.module';
import { DataSource } from 'typeorm';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
    imports: [TypeOrmModule.forRoot(TypeOrmOption), UserModule, AuthModule, BoardModule, AttendanceModule],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
