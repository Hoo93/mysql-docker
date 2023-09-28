import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmOption: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'test',
    database: 'healthRecord',
    // TODO
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
};
