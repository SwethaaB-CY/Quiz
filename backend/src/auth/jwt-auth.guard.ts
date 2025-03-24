import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('❌ No token provided');
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // ✅ Extract token correctly

    try {
      // ✅ Validate JWT with Project A (`5000`)
      const response = await axios.get('http://localhost:5000/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      });

      request.user = response.data; // ✅ Attach user data to request
      return true;
    } catch (error) {
      console.error('❌ Invalid or expired token:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
