/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service'; // ✅ Import PrismaService

@Injectable()
export class QuizService {
  private readonly FASTAPI_URL = 'http://127.0.0.1:8000/generate-quiz'; // Update if your API runs on a different port
  private readonly PROJECT_A_URL = 'http://localhost:5000/quiz/submit'; // ✅ Project A's API URL

  constructor(private readonly prisma: PrismaService) {} // ✅ Inject PrismaService

  // 🔹 Fetch Quiz from FastAPI (Python LLM)
  async fetchQuiz(topic: string, numQuestions: number): Promise<any> {
    try {
      const response = await axios.get(this.FASTAPI_URL, {
        params: { topic, num_questions: numQuestions },
      });

      return response.data; // ✅ Return the quiz data
    } catch (error: any) {
      console.error('❌ Error fetching quiz:', error.message);
      throw new HttpException(
        'Failed to fetch quiz',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 🔹 Send Quiz Submission to Project A
  async submitQuiz(userId: string, quizData: any) {
    console.log('📤 Sending quiz data to Project A...');

    try {
      const response = await axios.post(
        this.PROJECT_A_URL, // ✅ Project A's API endpoint
        { userId, ...quizData }, // ✅ Send userId along with quiz data
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('✅ Quiz submitted successfully to Project A:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to submit quiz to Project A:', error.message);
      throw new HttpException(
        'Quiz submission failed.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
