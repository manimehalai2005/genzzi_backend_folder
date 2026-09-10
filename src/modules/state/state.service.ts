import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import type { createStateDto, updateStateDto } from '../../master-service/dto';
import { PrismaService } from '../../prisma/prisma.service';
import { State } from '../../master-service';


@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createStateDto): Promise<State> {
    const countryExists = await this.prisma.country.findUnique({
      where: { id: dto.countryId },
    });

    if (!countryExists) {
      throw new NotFoundException('Selected country does not exist');
    }

    const existingState = await this.prisma.state.findFirst({
      where: {
        name: dto.name,
        countryId: dto.countryId,
      },
    });

    if (existingState) {
      throw new ConflictException(`State '${dto.name}' already exists for this country.`);
    }

    const result = await this.prisma.state.create({ data: dto });
    return result as State;
  }

  async findAll(page = 1, limit = 10): Promise<{ data: State[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.state.findMany({ skip, take: limit }),
      this.prisma.state.count(),
    ]);
    return { data: data as State[], total };
  }

  async findOne(id: string): Promise<State> {
    const item = await this.prisma.state.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('State not found');
    return item as State;
  }

  async update(id: string, dto: updateStateDto): Promise<State> {
    await this.findOne(id);
    const result = await this.prisma.state.update({ where: { id }, data: dto });
    return result as State;
  }

  async remove(id: string): Promise<State> {
    await this.findOne(id);
    const result = await this.prisma.state.delete({ where: { id } });
    return result as State;
  }
}