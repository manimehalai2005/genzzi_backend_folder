import { Module } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { TimezoneController } from './timezone.controller';
import { TimezoneService } from './timezone.service';


@Module({
  controllers: [TimezoneController],
  providers: [TimezoneService, PrismaService],
  exports: [TimezoneService],
})
export class TimezoneModule {}