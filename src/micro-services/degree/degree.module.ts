import { Module } from '@nestjs/common';
import { DegreeController } from './degree.controller.js';
import { DegreeService } from './degree.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [DegreeController],
  providers: [DegreeService, PrismaService],
  exports: [DegreeService],
})
export class DegreeModule {}