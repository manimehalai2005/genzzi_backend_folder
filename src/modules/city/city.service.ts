import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { City, createCityDto, updateCityDto } from '../../master-service';



@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCityDto): Promise<City> {
    const result = await this.prisma.city.create({ data: dto });
    return result as City;
  }

  async findAll(page = 1, limit = 10): Promise<{ data: City[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.city.findMany({ skip, take: limit }),
      this.prisma.city.count(),
    ]);
    return { data: data as City[], total };
  }

  async findOne(id: string): Promise<City> {
    const item = await this.prisma.city.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('City not found');
    return item as City;
  }

  async update(id: string, dto: updateCityDto): Promise<City> {
    await this.findOne(id);
    const result = await this.prisma.city.update({ where: { id }, data: dto });
    return result as City;
  }

  async remove(id: string): Promise<City> {
    await this.findOne(id);
    const result = await this.prisma.city.delete({ where: { id } });
    return result as City;
  }
}