import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    QuizModule, // ✅ Import QuizModule
    AuthModule, // ✅ Import AuthModule
  ],
})
export class AppModule {}