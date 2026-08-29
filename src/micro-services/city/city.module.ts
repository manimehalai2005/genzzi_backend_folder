import { Module } from '@nestjs/common';
import { CityController } from './city.controller.js';
import { CityService } from './city.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [CityController],
  providers: [CityService, PrismaService],
  exports: [CityService],
})
export class CityModule {}