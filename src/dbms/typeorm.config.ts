import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmOption: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'test',
    database: 'healthRecord',
    entities: [__dirname + '/../*.entity.{js,ts}'],
    autoLoadEntities: true,
    synchronize: true,
};
