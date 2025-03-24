// filepath: c:\Users\Swetha Balu\OneDrive\Desktop\Q\backend\src\auth\auth.module.ts
import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Global() // ✅ Make AuthModule global
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard, JwtModule], // ✅ Export JwtModule and AuthGuard
})
export class AuthModule {}