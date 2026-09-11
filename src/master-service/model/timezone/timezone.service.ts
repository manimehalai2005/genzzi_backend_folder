import { Injectable, NotFoundException } from '@nestjs/common';
// Path-ai unga project-ku thagapadi mathikonga
import type { CreateTimezoneDto, UpdateTimezoneDto } from '../../dto';
import type { TimezoneResponse, TimezonesPaginatedResponse } from '../../response';
import { Prisma } from '../../../generated/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TimezoneService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTimezoneDto): Promise<TimezoneResponse> {
    const data = await this.prisma.timezone.create({ 
      data: dto as Prisma.TimezoneCreateInput 
    });
    return { success: true, message: 'Timezone created successfully', data };
  }

  async findAll(page = 1, limit = 10): Promise<TimezonesPaginatedResponse> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.timezone.findMany({ skip, take: limit }),
      this.prisma.timezone.count(),
    ]);
    return {
      success: true,
      message: 'Timezones fetched successfully',
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<TimezoneResponse> {
    const data = await this.prisma.timezone.findUnique({ where: { id } });
    if (!data) throw new NotFoundException(`Timezone with ID ${id} not found`);
    return { success: true, message: 'Timezone fetched successfully', data };
  }
  async update(id: string, dto: UpdateTimezoneDto): Promise<TimezoneResponse> {
    console.log("Backend-ku vantha ID:", id); // Ithu enna print panrathu nu NestJS terminal-la parunga

    const existing = await this.prisma.timezone.findUnique({ where: { id } });
    if (!existing) {
      console.log("Database-la intha ID irukkum pothu kidaikkala!");
      throw new NotFoundException(`Timezone with ID ${id} not found`);
    }

    const data = await this.prisma.timezone.update({
      where: { id },
      data: dto as Prisma.TimezoneUpdateInput,
    });

    return {
      success: true,
      message: 'Timezone updated successfully',
      data,
    };
  }
  async remove(id: string): Promise<TimezoneResponse> {
    await this.findOne(id);
    const data = await this.prisma.timezone.delete({ where: { id } });
    return { success: true, message: 'Timezone deleted successfully', data };
  }
}