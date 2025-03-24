// filepath: c:\Users\Swetha Balu\OneDrive\Desktop\Q\backend\src\prisma\prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ✅ Export PrismaService
})
export class PrismaModule {}