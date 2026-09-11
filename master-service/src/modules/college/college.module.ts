import { Module } from '@nestjs/common';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CollegeController],
  providers: [CollegeService, PrismaService],
  exports: [CollegeService],
})
export class CollegeModule {}