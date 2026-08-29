import { Module } from '@nestjs/common';
import { FileTypeController } from './filetype.controller.js';
import { FileTypeService } from './filetype.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [FileTypeController],
  providers: [FileTypeService, PrismaService],
  exports: [FileTypeService],
})
export class FileTypeModule {}