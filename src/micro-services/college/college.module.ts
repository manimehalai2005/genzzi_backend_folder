import { Module } from '@nestjs/common';
import { CollegeController } from './college.controller.js';
import { CollegeService } from './college.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [CollegeController],
  providers: [CollegeService, PrismaService],
  exports: [CollegeService],
})
export class CollegeModule {}