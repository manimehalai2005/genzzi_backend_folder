import { Module } from '@nestjs/common';


import { FileTypeController } from './filetype.controller';
import { FileTypeService } from './filetype.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [FileTypeController],
  providers: [FileTypeService, PrismaService],
  exports: [FileTypeService],
})
export class FileTypeModule {}