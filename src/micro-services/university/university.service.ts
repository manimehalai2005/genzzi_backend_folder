import { Injectable, NotFoundException } from '@nestjs/common';
import { createUniversityDto, updateUniversityDto } from '../dto.js';
import { University } from '../types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class UniversityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createUniversityDto): Promise<University> {
    return this.prisma.university.create({ data: { ...dto } }) as unknown as University;
  }

  async findAll(): Promise<University[]> {
    return this.prisma.university.findMany() as unknown as University[];
  }

  async findOne(id: string): Promise<University> {
    const item = await this.prisma.university.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('University not found');
    return item as unknown as University;
  }

  async update(id: string, dto: updateUniversityDto): Promise<University> {
    await this.findOne(id);
    const updated = await this.prisma.university.update({ where: { id }, data: { ...dto } });
    return updated as unknown as University;
  }

  async remove(id: string): Promise<University> {
    await this.findOne(id);
    const deleted = await this.prisma.university.delete({ where: { id } });
    return deleted as unknown as University;
  }
}