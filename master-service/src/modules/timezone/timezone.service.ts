import { Injectable, NotFoundException } from '@nestjs/common';
import { creatTimeZoneDto, updateTimeZoneDto } from '../../master-service/dto';
import { Timezone } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimezoneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: creatTimeZoneDto): Promise<Timezone> {
    return this.prisma.timezone.create({ data: { ...dto } }) as unknown as Timezone;
  }

  async findAll(): Promise<Timezone[]> {
    return this.prisma.timezone.findMany() as unknown as Timezone[];
  }

  async findOne(id: string): Promise<Timezone> {
    const timezone = await this.prisma.timezone.findUnique({ where: { id } });
    if (!timezone) throw new NotFoundException('Timezone not found');
    return timezone as unknown as Timezone;
  }

  async update(id: string, dto: updateTimeZoneDto): Promise<Timezone> {
    await this.findOne(id);
    const updated = await this.prisma.timezone.update({ where: { id }, data: { ...dto } });
    return updated as unknown as Timezone;
  }

  async remove(id: string): Promise<Timezone> {
    await this.findOne(id);
    const deleted = await this.prisma.timezone.delete({ where: { id } });
    return deleted as unknown as Timezone;
  }
}