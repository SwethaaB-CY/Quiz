import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express'; // ✅ Correct import (no alias)
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

const server = express(); // ✅ Correct way to create an Express instance

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.use(cookieParser()); // ✅ Enables reading cookies from requests

    app.enableCors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true, // ✅ Allow cookies
    });

    await app.init(); // ✅ Initialize NestJS app
}

bootstrap();

export default server; // ✅ Export Express server for Vercel
