import { Injectable, NotFoundException } from '@nestjs/common';
import { createCollegeDto, updateCollegeDto } from '../dto.js';
import { College } from '../types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class CollegeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCollegeDto): Promise<College> {
    return this.prisma.college.create({ data: { ...dto } }) as unknown as College;
  }

  async findAll(): Promise<College[]> {
    return this.prisma.college.findMany() as unknown as College[];
  }

  async findOne(id: string): Promise<College> {
    const item = await this.prisma.college.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('College not found');
    return item as unknown as College;
  }

  async update(id: string, dto: updateCollegeDto): Promise<College> {
    await this.findOne(id);
    const updated = await this.prisma.college.update({ where: { id }, data: { ...dto } });
    return updated as unknown as College;
  }

  async remove(id: string): Promise<College> {
    await this.findOne(id);
    const deleted = await this.prisma.college.delete({ where: { id } });
    return deleted as unknown as College;
  }
}