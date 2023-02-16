import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // nao exibe mais propriedades que as definidas nos DTOs
      forbidNonWhitelisted: true, // impede que o programa continue com propriedades execedentes
      transform: true, // tranforma o objeto para o tipo do DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
