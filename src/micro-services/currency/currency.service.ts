import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatecurrencyDto, UpdatecurrencyDto } from '../dto.js';
import { Currency } from '../types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatecurrencyDto): Promise<Currency> {
    return this.prisma.currency.create({ data: { ...dto } }) as unknown as Currency;
  }

  async findAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany() as unknown as Currency[];
  }

  async findOne(code: string): Promise<Currency> {
    const currency = await this.prisma.currency.findUnique({ where: { code } });
    if (!currency) throw new NotFoundException('Currency not found');
    return currency as unknown as Currency;
  }

  async update(code: string, dto: UpdatecurrencyDto): Promise<Currency> {
    await this.findOne(code);
    const updated = await this.prisma.currency.update({ where: { code }, data: { ...dto } });
    return updated as unknown as Currency;
  }

  async remove(code: string): Promise<Currency> {
    await this.findOne(code);
    const deleted = await this.prisma.currency.delete({ where: { code } });
    return deleted as unknown as Currency;
  }
}