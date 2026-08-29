import { Injectable, NotFoundException } from '@nestjs/common';
import { createCollegeDepartmentDto, updateCollegeDepartmentDto } from '../dto.js';
import { CollegeDepartment } from '../types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class CollegeDepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCollegeDepartmentDto): Promise<CollegeDepartment> {
    return this.prisma.collegeDepartment.create({
      data: {
        college: {
          connect: { id: dto.collegeId },
        },
        department: {
          connect: { id: dto.departmentId },
        },
      },
    }) as unknown as CollegeDepartment;
  }

  async findAll(): Promise<CollegeDepartment[]> {
    return this.prisma.collegeDepartment.findMany() as unknown as CollegeDepartment[];
  }

  async findOne(id: string): Promise<CollegeDepartment> {
    const item = await this.prisma.collegeDepartment.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('College Department not found');
    return item as unknown as CollegeDepartment;
  }

  async update(id: string, dto: updateCollegeDepartmentDto): Promise<CollegeDepartment> {
    await this.findOne(id);
    const updated = await this.prisma.collegeDepartment.update({
      where: { id },
      data: {
        ...(dto.collegeId && { college: { connect: { id: dto.collegeId } } }),
        ...(dto.departmentId && { department: { connect: { id: dto.departmentId } } }),
      },
    });
    return updated as unknown as CollegeDepartment;
  }

  async remove(id: string): Promise<CollegeDepartment> {
    await this.findOne(id);
    const deleted = await this.prisma.collegeDepartment.delete({ where: { id } });
    return deleted as unknown as CollegeDepartment;
  }
}