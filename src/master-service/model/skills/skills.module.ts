import { Module } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { SkillController } from './skills.controller';
import { SkillService } from './skills.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService],
  exports: [SkillService],
})
export class SkillModule {}