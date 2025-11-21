import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // отбрасывает поля, которых нет в DTO
      forbidNonWhitelisted: true, // кидает ошибку, если пришли лишние поля
      transform: true,          // превращает строки в числа и т.п. по типам DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
