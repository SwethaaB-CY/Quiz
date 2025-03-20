/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow frontend requests
  app.enableCors();

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  Logger.log(`🚀 Server running on http://localhost:${PORT}`);
}

bootstrap();
