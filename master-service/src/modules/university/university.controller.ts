import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UniversityService } from './university.service';
import type { createUniversityDto, updateUniversityDto } from '../../master-service/dto';
import { UniversityResponse, UniversitiesPaginatedResponse } from '../../master-service/response';

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  async create(@Body() dto: createUniversityDto): Promise<UniversityResponse> {
    const data = await this.universityService.create(dto);
    return { success: true, message: 'University created successfully', data };
  }

  @Get()
  async findAll(): Promise<UniversitiesPaginatedResponse> {
    const data = await this.universityService.findAll();
    return { success: true, message: 'Universities fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UniversityResponse> {
    const data = await this.universityService.findOne(id);
    return { success: true, message: 'University fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateUniversityDto): Promise<UniversityResponse> {
    const data = await this.universityService.update(id, dto);
    return { success: true, message: 'University updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UniversityResponse> {
    const data = await this.universityService.remove(id);
    return { success: true, message: 'University deleted successfully', data };
  }
}