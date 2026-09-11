import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import type  { createDepartmentDto, updateDepartmentDto } from '../../master-service/dto';
import { DepartmentResponse, DepartmentsPaginatedResponse } from '../../master-service/response';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() dto: createDepartmentDto): Promise<DepartmentResponse> {
    const data = await this.departmentService.create(dto);
    return { success: true, message: 'Department created successfully', data };
  }

  @Get()
  async findAll(): Promise<DepartmentsPaginatedResponse> {
    const data = await this.departmentService.findAll();
    return { success: true, message: 'Departments fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DepartmentResponse> {
    const data = await this.departmentService.findOne(id);
    return { success: true, message: 'Department fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateDepartmentDto): Promise<DepartmentResponse> {
    const data = await this.departmentService.update(id, dto);
    return { success: true, message: 'Department updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DepartmentResponse> {
    const data = await this.departmentService.remove(id);
    return { success: true, message: 'Department deleted successfully', data };
  }
}