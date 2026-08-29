import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller.js';
import { LanguageService } from './language.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [LanguageController],
  providers: [LanguageService, PrismaService],
  exports: [LanguageService],
})
export class LanguageModule {}