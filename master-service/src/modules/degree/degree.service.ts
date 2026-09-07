import { Injectable, NotFoundException } from '@nestjs/common';
import { createDegreeDto, updateDegreeDto } from '../../master-service/dto';
import { Degree } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DegreeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createDegreeDto): Promise<Degree> {
    return this.prisma.degree.create({ data: { ...dto } }) as unknown as Degree;
  }

  async findAll(): Promise<Degree[]> {
    return this.prisma.degree.findMany() as unknown as Degree[];
  }

  async findOne(id: string): Promise<Degree> {
    const item = await this.prisma.degree.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Degree not found');
    return item as unknown as Degree;
  }

  async update(id: string, dto: updateDegreeDto): Promise<Degree> {
    await this.findOne(id);
    const updated = await this.prisma.degree.update({ where: { id }, data: { ...dto } });
    return updated as unknown as Degree;
  }

  async remove(id: string): Promise<Degree> {
    await this.findOne(id);
    const deleted = await this.prisma.degree.delete({ where: { id } });
    return deleted as unknown as Degree;
  }
}