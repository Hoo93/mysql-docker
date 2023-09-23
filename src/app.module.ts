import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmOption } from './dbms/typeorm.config';
import { DataSource } from 'typeorm';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendeeModule } from './attendee/attendee.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(TypeOrmOption),
        UserModule,
        AuthModule,
        AttendanceModule,
        AttendeeModule,
        CommentModule,
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
