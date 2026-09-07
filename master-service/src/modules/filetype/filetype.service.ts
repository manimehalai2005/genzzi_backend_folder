import { Injectable, NotFoundException } from '@nestjs/common';
import { createFileTypeDto, updateFileTypeDto } from '../../master-service/dto';
import { FileType } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FileTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createFileTypeDto): Promise<FileType> {
    return this.prisma.fileType.create({ data: { ...dto } }) as unknown as FileType;
  }

  async findAll(): Promise<FileType[]> {
    return this.prisma.fileType.findMany() as unknown as FileType[];
  }

  async findOne(id: string): Promise<FileType> {
    const item = await this.prisma.fileType.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('File Type not found');
    return item as unknown as FileType;
  }

  async update(id: string, dto: updateFileTypeDto): Promise<FileType> {
    await this.findOne(id);
    const updated = await this.prisma.fileType.update({ where: { id }, data: { ...dto } });
    return updated as unknown as FileType;
  }

  async remove(id: string): Promise<FileType> {
    await this.findOne(id);
    const deleted = await this.prisma.fileType.delete({ where: { id } });
    return deleted as unknown as FileType;
  }
}