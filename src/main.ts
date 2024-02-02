import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true}),
    new ValidationPipe({
      transform: true,
      transformOptions: {groups: ["transform"]}
    }));
    const config = new DocumentBuilder()
    .setTitle('Desafio Fullstack API')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
