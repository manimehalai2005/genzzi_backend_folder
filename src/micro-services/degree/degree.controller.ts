import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DegreeService } from './degree.service.js';
import type  { createDegreeDto, updateDegreeDto } from '../dto.js';
import { DegreeResponse, DegreesPaginatedResponse } from '../response.js';

@Controller('degrees')
export class DegreeController {
  constructor(private readonly degreeService: DegreeService) {}

  @Post()
  async create(@Body() dto: createDegreeDto): Promise<DegreeResponse> {
    const data = await this.degreeService.create(dto);
    return { success: true, message: 'Degree created successfully', data };
  }

  @Get()
  async findAll(): Promise<DegreesPaginatedResponse> {
    const data = await this.degreeService.findAll();
    return { success: true, message: 'Degrees fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DegreeResponse> {
    const data = await this.degreeService.findOne(id);
    return { success: true, message: 'Degree fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateDegreeDto): Promise<DegreeResponse> {
    const data = await this.degreeService.update(id, dto);
    return { success: true, message: 'Degree updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DegreeResponse> {
    const data = await this.degreeService.remove(id);
    return { success: true, message: 'Degree deleted successfully', data };
  }
}