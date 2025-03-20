/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz') // ✅ This makes /quiz a valid route
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get() // ✅ Handles GET /quiz requests
  async getQuiz(
    @Query('topic') topic: string,
    @Query('num_questions') numQuestions: number,
  ) {
    return this.quizService.fetchQuiz(topic, numQuestions);
  }
}
