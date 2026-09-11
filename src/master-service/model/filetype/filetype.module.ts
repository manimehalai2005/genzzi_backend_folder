import { Module } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { FileTypeController } from './filetype.controller';
import { FileTypeService } from './filetype.service';

@Module({
  controllers: [FileTypeController],
  providers: [FileTypeService, PrismaService],
  exports: [FileTypeService],
})
export class FileTypeModule {}