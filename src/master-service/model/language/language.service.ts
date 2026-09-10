import { Injectable, NotFoundException } from '@nestjs/common';
import { Language } from '../../../generated/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLanguageDto, UpdateLanguageDto } from '../../dto';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateLanguageDto): Promise<Language> {
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
  async findOne(code: string): Promise<Language> {
    const item = await this.prisma.language.findUnique({
      where: {
        code,
      },
    });

    if (!item) {
      throw new NotFoundException('Language not found');
    }

    return item as Language;
  }

  // UPDATE BY CODE
  async update(
    code: string,
    dto: UpdateLanguageDto,
  ): Promise<Language> {
    await this.findOne(code);

    const result = await this.prisma.language.update({
      where: {
        code,
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