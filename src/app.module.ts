import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmOption } from './dbms/typeorm.config';

@Module({
    imports: [TypeOrmModule.forRoot(TypeOrmOption), UserModule, AuthModule],
})
export class AppModule {}
