import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import  type { createCollegeDepartmentDto, updateCollegeDepartmentDto } from '../../master-service/dto';
import { CollegeDepartmentResponse, CollegeDepartmentsPaginatedResponse } from '../../master-service/response';
import { CollegeDepartmentService } from './collegedepartment.service';


@Controller('college-departments')
export class CollegeDepartmentController {
  constructor(private readonly collegeDepartmentService: CollegeDepartmentService) {}

  @Post()
  async create(@Body() dto: createCollegeDepartmentDto): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.create(dto);
    return { success: true, message: 'College Department created successfully', data };
  }

  @Get()
  async findAll(): Promise<CollegeDepartmentsPaginatedResponse> {
    const data = await this.collegeDepartmentService.findAll();
    return { success: true, message: 'College Departments fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.findOne(id);
    return { success: true, message: 'College Department fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateCollegeDepartmentDto): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.update(id, dto);
    return { success: true, message: 'College Department updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.remove(id);
    return { success: true, message: 'College Department deleted successfully', data };
  }
}