import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CollegeService } from './college.service';
import type  { createCollegeDto, updateCollegeDto } from '../../master-service/dto';
import { CollegeResponse, CollegesPaginatedResponse } from '../../master-service/response';

@Controller('colleges')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Post()
  async create(@Body() dto: createCollegeDto): Promise<CollegeResponse> {
    const data = await this.collegeService.create(dto);
    return { success: true, message: 'College created successfully', data };
  }

  @Get()
  async findAll(): Promise<CollegesPaginatedResponse> {
    const data = await this.collegeService.findAll();
    return { success: true, message: 'Colleges fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CollegeResponse> {
    const data = await this.collegeService.findOne(id);
    return { success: true, message: 'College fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateCollegeDto): Promise<CollegeResponse> {
    const data = await this.collegeService.update(id, dto);
    return { success: true, message: 'College updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CollegeResponse> {
    const data = await this.collegeService.remove(id);
    return { success: true, message: 'College deleted successfully', data };
  }
}