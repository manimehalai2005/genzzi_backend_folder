import { Injectable, NotFoundException } from '@nestjs/common';
import { createCityDto, updateCityDto } from '../../master-service/dto';
import { City } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCityDto): Promise<City> {
    return this.prisma.city.create({ data: { ...dto } }) as unknown as City;
  }

  async findAll(): Promise<City[]> {
    return this.prisma.city.findMany() as unknown as City[];
  }

  async findOne(id: string): Promise<City> {
    const city = await this.prisma.city.findUnique({ where: { id } });
    if (!city) throw new NotFoundException('City not found');
    return city as unknown as City;
  }

  async update(id: string, dto: updateCityDto): Promise<City> {
    await this.findOne(id);
    const updated = await this.prisma.city.update({ where: { id }, data: { ...dto } });
    return updated as unknown as City;
  }

  async remove(id: string): Promise<City> {
    await this.findOne(id);
    const deleted = await this.prisma.city.delete({ where: { id } });
    return deleted as unknown as City;
  }
}