import { Module } from '@nestjs/common';
import { TimezoneController } from './timezone.controller.js';
import { TimezoneService } from './timezone.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [TimezoneController],
  providers: [TimezoneService, PrismaService],
  exports: [TimezoneService],
})
export class TimezoneModule {}