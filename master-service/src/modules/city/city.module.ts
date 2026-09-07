import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CityController],
  providers: [CityService, PrismaService],
  exports: [CityService],
})
export class CityModule {}