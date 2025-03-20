import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';

@Module({
  imports: [HttpModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
