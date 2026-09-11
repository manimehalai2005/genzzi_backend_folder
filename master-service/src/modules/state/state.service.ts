import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { createStateDto, updateStateDto } from '../../master-service/dto';
import { StateResponse, StatesPaginatedResponse } from '../../master-service/response';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createStateDto): Promise<StateResponse> {
    const state = await this.prisma.state.create({
      data: dto,
    });
    return {
      success: true,
      message: 'State created successfully',
      data: state,
    };
  }

  async findAll(page = 1, limit = 10): Promise<StatesPaginatedResponse> {
    const skip = (page - 1) * limit;
    const [states, total] = await Promise.all([
      this.prisma.state.findMany({
        skip,
        take: limit,
        include: { country: true, cities: true },
      }),
      this.prisma.state.count(),
    ]);

    return {
      success: true,
      message: 'States fetched successfully',
      data: states,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<StateResponse> {
    const state = await this.prisma.state.findUnique({
      where: { id },
      include: { country: true, cities: true },
    });

    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'State fetched successfully',
      data: state,
    };
  }

  async update(id: string, dto: updateStateDto): Promise<StateResponse> {
    await this.findOne(id);

    const updated = await this.prisma.state.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      message: 'State updated successfully',
      data: updated,
    };
  }

  async remove(id: string): Promise<StateResponse> {
    await this.findOne(id);

    const deleted = await this.prisma.state.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'State deleted successfully',
      data: deleted,
    };
  }
}