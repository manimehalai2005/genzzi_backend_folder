import { Module } from '@nestjs/common';
import { CollegeDepartmentController } from './collegedepartment.controller';
import { CollegeDepartmentService } from './collegedepartment.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CollegeDepartmentController],
  providers: [CollegeDepartmentService, PrismaService],
  exports: [CollegeDepartmentService],
})
export class CollegeDepartmentModule {}