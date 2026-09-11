import { Injectable, NotFoundException } from '@nestjs/common';
import { createindustryDto, updateindustryDto } from '../../master-service/dto';
import { Industry } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class IndustryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createindustryDto): Promise<Industry> {
    return this.prisma.industry.create({ data: { ...dto } }) as unknown as Industry;
  }

  async findAll(): Promise<Industry[]> {
    return this.prisma.industry.findMany() as unknown as Industry[];
  }

  async findOne(id: string): Promise<Industry> {
    const item = await this.prisma.industry.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Industry not found');
    return item as unknown as Industry;
  }

  async update(id: string, dto: updateindustryDto): Promise<Industry> {
    await this.findOne(id);
    const updated = await this.prisma.industry.update({ where: { id }, data: { ...dto } });
    return updated as unknown as Industry;
  }

  async remove(id: string): Promise<Industry> {
    await this.findOne(id);
    const deleted = await this.prisma.industry.delete({ where: { id } });
    return deleted as unknown as Industry;
  }
}