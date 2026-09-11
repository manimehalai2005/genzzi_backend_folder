import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Country } from '../../master-service';
import type { createCountryDto, updateCountryDto }  from "../../master-service/dto"

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCountryDto): Promise<Country> {
    return this.prisma.country.create({
      data: dto,
    });
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: Country[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.country.findMany({
        skip,
        take: limit,
      }),
      this.prisma.country.count(),
    ]);

    return { data, total };
  }

  async findOne(id: string): Promise<Country> {
    const item = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Country not found');
    }

    return item;
  }

  async update(
    id: string,
    dto: updateCountryDto,
  ): Promise<Country> {
    await this.findOne(id);

    const { status, ...restDto } = dto;

    return this.prisma.country.update({
      where: { id },
      data: {
        ...restDto,
        ...(status && { status }),
      },
    });
  }

  async remove(id: string): Promise<Country> {
    await this.findOne(id);

    return this.prisma.country.delete({
      where: { id },
    });
  }
}