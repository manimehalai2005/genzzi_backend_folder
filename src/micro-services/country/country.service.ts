import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { createCountryDto, updateCountryDto } from '../dto.js'; // Ungaloda dto.ts file path
import { CountryResponse, CountriesPaginatedResponse } from '../response.js';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createCountryDto): Promise<CountryResponse> {
    const country = await this.prisma.country.create({
      data: dto,
    });

    return {
      success: true,
      message: 'Country created successfully',
      data: country,
    };
  }

  async findAll(page = 1, limit = 10): Promise<CountriesPaginatedResponse> {
    const skip = (page - 1) * limit;
    
    const [countries, total] = await Promise.all([
      this.prisma.country.findMany({
        skip,
        take: limit,
        include: { states: true },
      }),
      this.prisma.country.count(),
    ]);

    return {
      success: true,
      message: 'Countries fetched successfully',
      data: countries,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<CountryResponse> {
    const country = await this.prisma.country.findUnique({
      where: { id },
      include: { states: true, universities: true, colleges: true },
    });

    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Country fetched successfully',
      data: country,
    };
  }

  async update(id: string, dto: updateCountryDto): Promise<CountryResponse> {
    await this.findOne(id);

    const updated = await this.prisma.country.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      message: 'Country updated successfully',
      data: updated,
    };
  }

  async remove(id: string): Promise<CountryResponse> {
    await this.findOne(id);

    const deleted = await this.prisma.country.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Country deleted successfully',
      data: deleted,
    };
  }
}