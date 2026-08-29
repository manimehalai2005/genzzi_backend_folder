import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller.js';
import { DepartmentService } from './department.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService],
  exports: [DepartmentService],
})
export class DepartmentModule {}