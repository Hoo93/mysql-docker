import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'test',
            database: 'mysql',
            synchronize: true,
        }),
        UserModule,
    ],
    providers: [],
})
export class AppModule {}

// Docker mysql container
// docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=test -p 3306:3306 -d mysql:8.0
