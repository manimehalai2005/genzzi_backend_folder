import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CityService } from './city.service.js';
import type { createCityDto, updateCityDto } from '../dto.js';
import { CityResponse, CitiesPaginatedResponse } from '../response.js';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() dto: createCityDto): Promise<CityResponse> {
    const data = await this.cityService.create(dto);
    return { success: true, message: 'City created successfully', data };
  }

  @Get()
  async findAll(): Promise<CitiesPaginatedResponse> {
    const data = await this.cityService.findAll();
    return { 
      success: true, 
      message: 'Cities fetched successfully', 
      data, 
      meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } 
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CityResponse> {
    const data = await this.cityService.findOne(id);
    return { success: true, message: 'City fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateCityDto): Promise<CityResponse> {
    const data = await this.cityService.update(id, dto);
    return { success: true, message: 'City updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CityResponse> {
    const data = await this.cityService.remove(id);
    return { success: true, message: 'City deleted successfully', data };
  }
}