import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { createUniversityDto, updateUniversityDto } from '../../master-service';



@Injectable()
export class UniversityService {
  constructor(private readonly prisma: PrismaService) {}

 async create(dto: createUniversityDto) {
  try {
    return await this.prisma.university.create({
      data: {
        name: dto.name,
        website: dto.website,
        countryId: dto.countryId,
        stateId: dto.stateId,
        cityId: dto.cityId,
      },
      include: {
        country: true,
        state: true,
        city: true,
      },
    });
  } catch (error) {
    throw error;
  }
}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.university.findMany({
        skip,
        take: limit,
        include: {
          country: true,
          state: true,
          city: true,
        },
      }),

      this.prisma.university.count(),
    ]);

    return {
      data,
      total,
    };
  }

  async findOne(id: string) {
    const item = await this.prisma.university.findUnique({
      where: { id },
      include: {
        country: true,
        state: true,
        city: true,
      },
    });

    if (!item) {
      throw new NotFoundException('University not found');
    }

    return item;
  }

 async update(id: string, dto: updateUniversityDto) {
  const cleanedData = {
    ...dto,
    countryId: dto.countryId || null,
    stateId: dto.stateId || null,
    cityId: dto.cityId || null,
  };

  try {
    return await this.prisma.university.update({
      where: { id },
      data: cleanedData,
      include: {
        country: true,
        state: true,
        city: true,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A university with this name already exists.',
        );
      }

      if (error.code === 'P2003') {
        throw new ConflictException(
          'Invalid foreign key reference. Please check country, state, or city IDs.',
        );
      }

      if (error.code === 'P2025') {
        throw new NotFoundException(
          'University not found.',
        );
      }
    }

    throw error;
  }
}
  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.university.delete({
      where: { id },
      include: {
        country: true,
        state: true,
        city: true,
      },
    });
  }
}