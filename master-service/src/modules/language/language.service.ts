import { Injectable, NotFoundException } from '@nestjs/common';
import type { createLanguageDto, updateLanguageDto } from "../../master-service/dto"
import { PrismaService } from '../../prisma/prisma.service';
import { Language } from '../../master-service';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(dto: createLanguageDto): Promise<Language> {
    const result = await this.prisma.language.create({
      data: dto,
    });

    return result as Language;
  }

  // GET ALL
  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: Language[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.language.findMany({
        skip,
        take: limit,
      }),
      this.prisma.language.count(),
    ]);

    return {
      data: data as Language[],
      total,
    };
  }

  // GET BY CODE
  async findOne(id: string): Promise<Language> {
    const item = await this.prisma.language.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Language not found');
    }

    return item as Language;
  }

  // UPDATE BY CODE
  async update(
    id: string,
    dto: updateLanguageDto,
  ): Promise<Language> {
    await this.findOne(id);

    const result = await this.prisma.language.update({
      where: {
        id,
      },
      data: dto,
    });

    return result as Language;
  }

  // DELETE BY ID
  async remove(id: string): Promise<Language> {
    const item = await this.prisma.language.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Language not found');
    }

    const result = await this.prisma.language.delete({
      where: {
        id,
      },
    });

    return result as Language;
  }
}