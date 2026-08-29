import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller.js';
import { UniversityService } from './university.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [UniversityController],
  providers: [UniversityService, PrismaService],
  exports: [UniversityService],
})
export class UniversityModule {}