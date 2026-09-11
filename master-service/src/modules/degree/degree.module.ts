import { Module } from '@nestjs/common';
import { DegreeController } from './degree.controller';
import { DegreeService } from './degree.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [DegreeController],
  providers: [DegreeService, PrismaService],
  exports: [DegreeService],
})
export class DegreeModule {}