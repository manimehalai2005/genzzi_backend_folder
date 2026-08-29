import { Module } from '@nestjs/common';
import { CountryService } from './country.service.js';
import { CountryController } from './country.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js'; 

@Module({
  imports: [PrismaModule], 
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}