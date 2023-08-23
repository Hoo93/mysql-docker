import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('workout recorder')
        .setDescription('workout recorder')
        .setVersion('1.0')
        .addTag('workout')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();

// Docker mysql container
// docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=test -p 3306:3306 -d mysql:8.0
