import { Injectable, NotFoundException } from '@nestjs/common';
import type { createCollegeDepartmentDto, updateCollegeDepartmentDto } from '../../master-service/dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CollegeDepartment } from '../../master-service';


@Injectable()
export class CollegeDepartmentService {
  constructor(private readonly prisma: PrismaService) {}

 async create(dto: createCollegeDepartmentDto): Promise<CollegeDepartment> {
  const result = await this.prisma.collegeDepartment.create({
    data: {
      collegeId: dto.collegeId,
      departmentId: dto.departmentId,
    },
    include: {
      college: true, 
      department: true,
    },
  });
  
  return result;
}

  async findAll(page = 1, limit = 10): Promise<{ data: CollegeDepartment[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.collegeDepartment.findMany({ 
        skip, 
        take: limit,
        include: {
          college: true,
          department: true,
        }
      }),
      this.prisma.collegeDepartment.count(),
    ]);
    return { data: data  as CollegeDepartment[], total };
  }

  async findOne(id: string): Promise<CollegeDepartment> {
    const item = await this.prisma.collegeDepartment.findUnique({ 
      where: { id },
      include: {
        college: true,
        department: true,
      }
    });
    if (!item) throw new NotFoundException('College Department not found');
    return item  as CollegeDepartment;
  }

 async update(id: string, dto: updateCollegeDepartmentDto): Promise<CollegeDepartment> {
 
  await this.findOne(id);

  const result = await this.prisma.collegeDepartment.update({ 
    where: { id }, 
    data: {
      collegeId: dto.collegeId,
      departmentId: dto.departmentId,
    },
    include: {
      college: true,
      department: true,
    }
  });

  return result as CollegeDepartment;
}
  async remove(id: string): Promise<CollegeDepartment> {
    await this.findOne(id);
    const result = await this.prisma.collegeDepartment.delete({ 
      where: { id },
      include: {
        college: true,
        department: true,
      }
    });
    return result as CollegeDepartment;
  }
}