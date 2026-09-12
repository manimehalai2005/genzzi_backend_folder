import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {  CurrenciesPaginatedResponse, Currency, CurrencyResponse } from '../../master-service';
import { Prisma } from '../../generated/prisma/client';
import  type {CreatecurrencyDto, UpdatecurrencyDto} from "../../master-service/dto"


@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatecurrencyDto): Promise<CurrencyResponse> {
    const data: Currency = await this.prisma.currency.create({ 
      data: dto as Prisma.CurrencyCreateInput 
    });
    return {
      success: true,
      message: 'Currency created successfully',
      data,
    };
  }

  async findAll(page = 1, limit = 10): Promise<CurrenciesPaginatedResponse> {
    const skip = (page - 1) * limit;
    const [data, total]: [Currency[], number] = await Promise.all([
      this.prisma.currency.findMany({ skip, take: limit }),
      this.prisma.currency.count(),
    ]);
    return {
      success: true,
      message: 'Currencies fetched successfully',
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<CurrencyResponse> {
    const data = await this.prisma.currency.findUnique({ where: { id } });
    if (!data) throw new NotFoundException('Currency not found');
    return {
      success: true,
      message: 'Currency fetched successfully',
      data,
    };
  }

  async update(id: string, dto: UpdatecurrencyDto): Promise<CurrencyResponse> {
    await this.findOne(id);
    const data: Currency = await this.prisma.currency.update({ 
      where: { id }, 
      data: dto as Prisma.CurrencyUpdateInput 
    });
    return {
      success: true,
      message: 'Currency updated successfully',
      data,
    };
  }

  async remove(id: string): Promise<CurrencyResponse> {
    await this.findOne(id);
    const data: Currency = await this.prisma.currency.delete({ where: { id } });
    return {
      success: true,
      message: 'Currency deleted successfully',
      data,
    };
  }
}