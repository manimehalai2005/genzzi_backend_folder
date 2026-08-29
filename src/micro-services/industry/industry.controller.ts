import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IndustryService } from './industry.service.js';
import type { createindustryDto, updateindustryDto } from '../dto.js';
import { IndustryResponse, IndustriesPaginatedResponse } from '../response.js';

@Controller('industries')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Post()
  async create(@Body() dto: createindustryDto): Promise<IndustryResponse> {
    const data = await this.industryService.create(dto);
    return { success: true, message: 'Industry created successfully', data };
  }

  @Get()
  async findAll(): Promise<IndustriesPaginatedResponse> {
    const data = await this.industryService.findAll();
    return { success: true, message: 'Industries fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IndustryResponse> {
    const data = await this.industryService.findOne(id);
    return { success: true, message: 'Industry fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateindustryDto): Promise<IndustryResponse> {
    const data = await this.industryService.update(id, dto);
    return { success: true, message: 'Industry updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IndustryResponse> {
    const data = await this.industryService.remove(id);
    return { success: true, message: 'Industry deleted successfully', data };
  }
}