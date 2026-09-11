import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityController } from './university.controller';
import { PrismaService } from '../../prisma/prisma.service';


@Module({
  controllers: [UniversityController],
  providers: [UniversityService, PrismaService],
  exports: [UniversityService],
})
export class UniversityModule {}