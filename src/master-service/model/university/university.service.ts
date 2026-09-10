import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateUniversityDto, UpdateUniversityDto, } from '../../dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, University } from '../../../generated/client';

@Injectable()
export class UniversityService {
  constructor(private readonly prisma: PrismaService) {}

async create(dto: CreateUniversityDto): Promise<University> {
  try {
    return await this.prisma.university.create({ 
      data: dto,
      include: {
        country: true,
        state: true,
        city: true,
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('A university with this name already exists.');
      }
      if (error.code === 'P2003') {
        throw new Error('Invalid foreign key reference. Please check country, state, or city IDs.');
      }
    }
    throw error;
  }
}
  async findAll(page = 1, limit = 10): Promise<{ data: University[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.university.findMany({ 
        skip, 
        take: limit,
        include: {
          country: true,
          state: true,
          city: true,
        }
      }),
      this.prisma.university.count(),
    ]);
    return { data: data as University[], total };
  }

  async findOne(id: string): Promise<University> {
    const item = await this.prisma.university.findUnique({ 
      where: { id },
      include: {
        country: true,
        state: true,
        city: true,
      }
    });
    if (!item) throw new NotFoundException('University not found');
    return item as University;
  }

async update(id: string, dto: UpdateUniversityDto): Promise<University> {
  await this.findOne(id);

  // Clean empty strings to prevent foreign key errors
  const cleanedData = {
    ...dto,
    countryId: dto.countryId || null,
    stateId: dto.stateId || null,
    cityId: dto.cityId || null,
  };

  const result = await this.prisma.university.update({ 
    where: { id }, 
    data: cleanedData,
    include: {
      country: true,
      state: true,
      city: true,
    }
  });
  
  return result as University;
}
  async remove(id: string): Promise<University> {
    await this.findOne(id);
    const result = await this.prisma.university.delete({ 
      where: { id },
      include: {
        country: true,
        state: true,
        city: true,
      }
    });
    return result as University;
  }
}