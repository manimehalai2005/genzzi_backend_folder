import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import type { CreatecurrencyDto, UpdatecurrencyDto } from '../../master-service/dto';
import { CurrencyResponse, CurrenciesPaginatedResponse } from '../../master-service/response';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(@Body() dto: CreatecurrencyDto): Promise<CurrencyResponse> {
    const data = await this.currencyService.create(dto);
    return { success: true, message: 'Currency created successfully', data };
  }

  @Get()
  async findAll(): Promise<CurrenciesPaginatedResponse> {
    const data = await this.currencyService.findAll();
    return { 
      success: true, 
      message: 'Currencies fetched successfully', 
      data, 
      meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } 
    };
  }

  @Get(':code')
  async findOne(@Param('code') code: string): Promise<CurrencyResponse> {
    const data = await this.currencyService.findOne(code);
    return { success: true, message: 'Currency fetched successfully', data };
  }

  @Put(':code')
  async update(@Param('code') code: string, @Body() dto: UpdatecurrencyDto): Promise<CurrencyResponse> {
    const data = await this.currencyService.update(code, dto);
    return { success: true, message: 'Currency updated successfully', data };
  }

  @Delete(':code')
  async remove(@Param('code') code: string): Promise<CurrencyResponse> {
    const data = await this.currencyService.remove(code);
    return { success: true, message: 'Currency deleted successfully', data };
  }
}