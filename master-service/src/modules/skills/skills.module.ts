import { Module } from '@nestjs/common';


import { SkillController } from './skills.controller';
import { SkillService } from './skills.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService],
  exports: [SkillService],
})
export class SkillModule {}