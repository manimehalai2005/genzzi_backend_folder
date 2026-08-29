import { Module } from '@nestjs/common';
import { SkillController } from './skills.controller.js';
import { SkillService } from './skills.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService],
  exports: [SkillService],
})
export class SkillModule {}