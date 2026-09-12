import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Department } from '../../master-service';
import type { createDepartmentDto, updateDepartmentDto } from "../../master-service/dto"


@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

 async create(dto: createDepartmentDto): Promise<Department> {
  // 'any' use pannama clean-ah destructure pannalam
  const { ...restDto } = dto;

  const result = await this.prisma.department.create({
    data: restDto, // Inga restDto automatic-ah { name, code } mattum edukum
    include: {
      colleges: true,
    },
  });
  
  return result;
}

  async findAll(page = 1, limit = 10): Promise<{ data: Department[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.department.findMany({ 
        skip, 
        take: limit,
        include: {
          colleges: true,
        }
      }),
      this.prisma.department.count(),
    ]);
    return { data: data  as Department[], total };
  }

  async findOne(id: string): Promise<Department> {
    const item = await this.prisma.department.findUnique({ 
      where: { id },
      include: {
        colleges: true,
      }
    });
    if (!item) throw new NotFoundException('Department not found');
    return item  as Department;
  }

  async update(id: string, dto: updateDepartmentDto): Promise<Department> {
    await this.findOne(id);
    const result = await this.prisma.department.update({ 
      where: { id }, 
      data: dto,
      include: {
        colleges: true,
      }
    });
    return result  as Department;
  }

  async remove(id: string): Promise<Department> {
    await this.findOne(id);
    const result = await this.prisma.department.delete({ 
      where: { id },
      include: {
        colleges: true,
      }
    });
    return result  as Department;
  }
}