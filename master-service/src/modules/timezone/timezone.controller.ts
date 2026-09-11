import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TimezoneService } from './timezone.service';
import type { creatTimeZoneDto, updateTimeZoneDto } from '../../master-service/dto';
import { TimezoneResponse, TimezonesPaginatedResponse } from '../../master-service/response';

@Controller('timezones')
export class TimezoneController {
  constructor(private readonly timezoneService: TimezoneService) {}

  @Post()
  async create(@Body() dto: creatTimeZoneDto): Promise<TimezoneResponse> {
    const data = await this.timezoneService.create(dto);
    return { success: true, message: 'Timezone created successfully', data };
  }

  @Get()
  async findAll(): Promise<TimezonesPaginatedResponse> {
    const data = await this.timezoneService.findAll();
    return { 
      success: true, 
      message: 'Timezones fetched successfully', 
      data, 
      meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } 
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimezoneResponse> {
    const data = await this.timezoneService.findOne(id);
    return { success: true, message: 'Timezone fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateTimeZoneDto): Promise<TimezoneResponse> {
    const data = await this.timezoneService.update(id, dto);
    return { success: true, message: 'Timezone updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TimezoneResponse> {
    const data = await this.timezoneService.remove(id);
    return { success: true, message: 'Timezone deleted successfully', data };
  }
}