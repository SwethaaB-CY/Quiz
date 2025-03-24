import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express'; // ✅ Correct import
import { ExpressAdapter } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser'; // ✅ Correct import

async function bootstrap() {
    const server = express(); // ✅ Correct Express instance

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.use(cookieParser()); // ✅ Enables reading cookies

    app.enableCors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true, // ✅ Allow cookies
    });

    await app.init(); // ✅ Initialize NestJS app

    return server; // ✅ Return Express server for Vercel
}

export default bootstrap(); // ✅ Correctly export for Vercel
