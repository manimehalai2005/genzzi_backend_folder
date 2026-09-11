import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateIndustryDto, UpdateIndustryDto } from '../../dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Industry } from '../../types';

@Injectable()
export class IndustryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateIndustryDto): Promise<Industry> {
    try {
      const result = await this.prisma.industry.create({ 
        data: {
          name: dto.name,
          description: dto.description,
        } 
      });
      return result as Industry;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('An industry with this name already exists.');
      }
      throw error;
    }
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Industry[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.industry.findMany({ skip, take: limit }),
      this.prisma.industry.count(),
    ]);
    return { data: data as Industry[], total };
  }

  async findOne(id: string): Promise<Industry> {
    const item = await this.prisma.industry.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Industry not found');
    return item as Industry;
  }

async update(id: string, dto: UpdateIndustryDto): Promise<Industry> {
    await this.findOne(id);
    try {
      const result = await this.prisma.industry.update({ 
        where: { id }, 
        data: {
          name: dto.name,
          description: dto.description,
        } 
      });
      return result as Industry;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('An industry with this name already exists.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Industry> {
    await this.findOne(id);
    const result = await this.prisma.industry.delete({ where: { id } });
    return result as Industry;
  }
}