import { Injectable, NotFoundException } from '@nestjs/common';
import { createDepartmentDto, updateDepartmentDto } from '../../master-service/dto';
import { Department } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createDepartmentDto): Promise<Department> {
    return this.prisma.department.create({ data: { ...dto } }) as unknown as Department;
  }

  async findAll(): Promise<Department[]> {
    return this.prisma.department.findMany() as unknown as Department[];
  }

  async findOne(id: string): Promise<Department> {
    const item = await this.prisma.department.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Department not found');
    return item as unknown as Department;
  }

  async update(id: string, dto: updateDepartmentDto): Promise<Department> {
    await this.findOne(id);
    const updated = await this.prisma.department.update({ where: { id }, data: { ...dto } });
    return updated as unknown as Department;
  }

  async remove(id: string): Promise<Department> {
    await this.findOne(id);
    const deleted = await this.prisma.department.delete({ where: { id } });
    return deleted as unknown as Department;
  }
}