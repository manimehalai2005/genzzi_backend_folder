import { Module } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { CollegeDepartmentController } from './collegedepartment.controller';
import { CollegeDepartmentService } from './collegedepartment.service';

@Module({
  controllers: [CollegeDepartmentController],
  providers: [CollegeDepartmentService, PrismaService],
  exports: [CollegeDepartmentService],
})
export class CollegeDepartmentModule {}