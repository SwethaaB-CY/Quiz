/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class QuizService {
  private readonly FASTAPI_URL = 'http://127.0.0.1:8000/generate-quiz'; // Update if your API runs on a different port

  async fetchQuiz(topic: string, numQuestions: number): Promise<any> {
    try {
      const response = await axios.get(this.FASTAPI_URL, {
        params: { topic, num_questions: numQuestions },
      });

      return response.data; // Return the quiz data
    } catch (error) {
      console.error('Error fetching quiz:', error.message);
      throw new HttpException(
        'Failed to fetch quiz',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
