import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module'; // ✅ Import QuizModule

@Module({
  imports: [QuizModule], // ✅ Import the QuizModule
  controllers: [AppController],
  providers: [AppService], // ✅ No need to manually add QuizService here
})
export class AppModule {}
