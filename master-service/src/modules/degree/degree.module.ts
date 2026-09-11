import { Module } from '@nestjs/common';
import { DegreeService } from './degree.service';
import { DegreeController } from './degree.controller';
import { PrismaService } from '../../prisma/prisma.service';


@Module({
  controllers: [DegreeController],
  providers: [DegreeService, PrismaService],
  exports: [DegreeService],
})
export class DegreeModule {}