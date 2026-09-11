import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import type { CreateCurrencyDto, UpdateCurrencyDto } from '../../dto';
import type { CurrencyResponse, CurrenciesPaginatedResponse } from '../../response';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(@Body() dto: CreateCurrencyDto): Promise<CurrencyResponse> {
    return this.currencyService.create(dto);
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<CurrenciesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    return this.currencyService.findAll(parsedPage, parsedLimit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CurrencyResponse> {
    return this.currencyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCurrencyDto,
  ): Promise<CurrencyResponse> {
    return this.currencyService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CurrencyResponse> {
    return this.currencyService.remove(id);
  }
}