import { Module } from '@nestjs/common';
import { CollegeDepartmentController } from './collegedepartment.controller.js';
import { CollegeDepartmentService } from './collegedepartment.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [CollegeDepartmentController],
  providers: [CollegeDepartmentService, PrismaService],
  exports: [CollegeDepartmentService],
})
export class CollegeDepartmentModule {}