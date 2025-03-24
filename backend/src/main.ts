import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser()); // ✅ Enables reading cookies from requests

    app.enableCors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true, // ✅ Allow cookies
    });
    

    await app.listen(5001);
}
bootstrap();
