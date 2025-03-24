// filepath: c:\Users\Swetha Balu\OneDrive\Desktop\Q\backend\src\quiz\quiz.module.ts
import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ No need to import AuthModule if it's global
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}