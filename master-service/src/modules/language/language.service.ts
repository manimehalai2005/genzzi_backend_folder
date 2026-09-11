import { Injectable, NotFoundException } from '@nestjs/common';
import { createLanguageDto, updateLanguageDto } from '../../master-service/dto';
import { Language } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LanguageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createLanguageDto): Promise<Language> {
    return this.prisma.language.create({ data: { ...dto } }) as unknown as Language;
  }

  async findAll(): Promise<Language[]> {
    return this.prisma.language.findMany() as unknown as Language[];
  }

  async findOne(code: string): Promise<Language> {
    const lang = await this.prisma.language.findUnique({ where: { code } });
    if (!lang) throw new NotFoundException('Language not found');
    return lang as unknown as Language;
  }

  async update(code: string, dto: updateLanguageDto): Promise<Language> {
    await this.findOne(code);
    const updated = await this.prisma.language.update({ where: { code }, data: { ...dto } });
    return updated as unknown as Language;
  }

  async remove(code: string): Promise<Language> {
    await this.findOne(code);
    const deleted = await this.prisma.language.delete({ where: { code } });
    return deleted as unknown as Language;
  }
}