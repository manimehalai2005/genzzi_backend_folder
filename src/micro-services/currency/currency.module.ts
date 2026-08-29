import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller.js';
import { CurrencyService } from './currency.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, PrismaService],
  exports: [CurrencyService],
})
export class CurrencyModule {}