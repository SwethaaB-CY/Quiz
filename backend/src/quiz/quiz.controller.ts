import { Controller, Post, Req, Body } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService // ✅ Inject JWT Service
  ) {}

  @Post('submit')
  async submitQuiz(@Req() req, @Body() quizData) {
    console.log("🔹 Received request in Project A:", quizData);
    
    // ✅ Extract token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('JWT token missing');
    }

    try {
      // ✅ Verify token
      const decodedUser = this.jwtService.verify(token);
      console.log("✅ Decoded User in Project A:", decodedUser);

      if (!decodedUser.userId) {
        throw new UnauthorizedException('User ID missing in token');
      }

      console.log("✅ Saving quiz for User ID:", decodedUser.userId);

      // ✅ Save to database
      const quiz = await this.prisma.quiz.create({
        data: {
          title: quizData.title, // ✅ Use title instead of topic
          totalQuestions: quizData.totalQuestions,
          score: quizData.score,
          userId: decodedUser.userId, // ✅ Store user ID from token
        },
      });
      

      console.log("✅ Quiz saved:", quiz);
      return { message: "Quiz submitted successfully", quiz };
    } catch (error) {
      console.error("❌ JWT Verification Failed:", error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
