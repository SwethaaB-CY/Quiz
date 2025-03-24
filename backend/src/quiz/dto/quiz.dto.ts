import { IsString, IsInt, Min, Max } from 'class-validator';

export class QuizDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(1)
  totalQuestions: number;

  @IsInt()
  @Min(0)
  @Max(100)
  score: number;
}