import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UniversityController],
  providers: [UniversityService, PrismaService],
  exports: [UniversityService],
})
export class UniversityModule {}