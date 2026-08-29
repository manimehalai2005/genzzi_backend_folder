import { Module } from '@nestjs/common';
import { IndustryController } from './industry.controller.js';
import { IndustryService } from './industry.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [IndustryController],
  providers: [IndustryService, PrismaService],
  exports: [IndustryService],
})
export class IndustryModule {}