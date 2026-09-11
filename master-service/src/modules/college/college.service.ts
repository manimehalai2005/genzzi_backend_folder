import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { College, createCollegeDto, updateCollegeDto } from '../../master-service';



@Injectable()
export class CollegeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCollegeDto): Promise<College> {
    const result = await this.prisma.college.create({ 
      data: dto,
      include: {
        country: true,
        state: true,
        city: true,
        departments: true,
      }
    });
    return result as College;
  }

  async findAll(page = 1, limit = 10): Promise<{ data: College[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.college.findMany({ 
        skip, 
        take: limit,
        include: {
          country: true,
          state: true,
          city: true,
          departments: true,
        }
      }),
      this.prisma.college.count(),
    ]);
    return { data: data  as College[], total };
  }

  async findOne(id: string): Promise<College> {
    const item = await this.prisma.college.findUnique({ 
      where: { id },
      include: {
        country: true,
        state: true,
        city: true,
        departments: true,
      }
    });
    if (!item) throw new NotFoundException('College not found');
    return item  as College;
  }

 async update(id: string, dto: updateCollegeDto): Promise<College> {
  await this.findOne(id);
  
  const result = await this.prisma.college.update({
    where: { id },
    data: dto, // DTO-la status illathanal inime error varathu
    include: {
      country: true,
      state: true,
      city: true,
      departments: true,
    },
  });
  
  return  result as College;
}

  async remove(id: string): Promise<College> {
    await this.findOne(id);
    const result = await this.prisma.college.delete({ 
      where: { id },
      include: {
        country: true,
        state: true,
        city: true,
        departments: true,
      }
    });
    return result  as College;
  }
}