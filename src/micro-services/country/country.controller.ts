import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CountryService } from './country.service.js';
import type { createCountryDto,updateCountryDto } from '../dto.js'; // Ungaloda dto.ts file path


@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() dto: createCountryDto) {
    return this.countryService.create(dto);
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.countryService.findAll(page ? Number(page) : 1, limit ? Number(limit) : 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: updateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}