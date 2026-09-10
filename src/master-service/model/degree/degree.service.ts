import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateDegreeDto, UpdateDegreeDto } from '../../dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Degree } from '../../types';

@Injectable()
export class DegreeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDegreeDto): Promise<Degree> {
    try {
      const result = await this.prisma.degree.create({ 
        data: {
          name: dto.name, 
        } 
      });
      return result as Degree;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('A degree with this name already exists.');
      }
      throw error;
    }
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Degree[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.degree.findMany({ skip, take: limit }),
      this.prisma.degree.count(),
    ]);
    return { data: data as Degree[], total };
  }

  async findOne(id: string): Promise<Degree> {
    const item = await this.prisma.degree.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Degree not found');
    return item as Degree;
  }

  async update(id: string, dto: UpdateDegreeDto): Promise<Degree> {
    await this.findOne(id);
    try {
      const result = await this.prisma.degree.update({ 
        where: { id }, 
        data: {
          name: dto.name,
        } 
      });
      return result as Degree;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('A degree with this name already exists.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Degree> {
    await this.findOne(id);
    const result = await this.prisma.degree.delete({ where: { id } });
    return result as Degree;
  }
}