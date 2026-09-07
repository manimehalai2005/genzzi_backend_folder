import { Module } from '@nestjs/common';
import { TimezoneController } from './timezone.controller';
import { TimezoneService } from './timezone.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TimezoneController],
  providers: [TimezoneService, PrismaService],
  exports: [TimezoneService],
})
export class TimezoneModule {}