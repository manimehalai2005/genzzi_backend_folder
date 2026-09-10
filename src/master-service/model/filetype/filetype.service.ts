import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateFileTypeDto, UpdateFileTypeDto } from '../../dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { FileType } from '../../types';
import { Prisma } from '../../../generated/client';

@Injectable()
export class FileTypeService {
  constructor(private readonly prisma: PrismaService) {}
async create(dto: CreateFileTypeDto) {
  try {
    return await this.prisma.fileType.create({
      data: {
        extension: dto.extension,
        mimeType: dto.mimeType,
        category: dto.category ?? null,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ConflictException('File extension or mimeType already exists.');
    }
    throw error;
  }
}
  async findAll(page = 1, limit = 10): Promise<{ data: FileType[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.fileType.findMany({ skip, take: limit }),
      this.prisma.fileType.count(),
    ]);
    return { data: data as FileType[], total };
  }

  async findOne(id: string): Promise<FileType> {
    const item = await this.prisma.fileType.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('File type not found');
    return item as FileType;
  }

  async update(id: string, dto: UpdateFileTypeDto) {
    await this.findOne(id);
    try {
      return await this.prisma.fileType.update({
        where: { id },
        data: {
          ...(dto.extension !== undefined && { extension: dto.extension }),
          ...(dto.mimeType !== undefined && { mimeType: dto.mimeType }),
          ...(dto.category !== undefined && { category: dto.category ?? null }),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('File extension or mimeType already exists.');
      }
      throw error;
    }
  }


  async remove(id: string): Promise<FileType> {
    await this.findOne(id);
    const result = await this.prisma.fileType.delete({ where: { id } });
    return result as FileType;
  }
}