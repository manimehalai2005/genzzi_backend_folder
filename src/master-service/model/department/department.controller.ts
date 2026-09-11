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
import { DepartmentService } from './department.service';
import type { CreateDepartmentDto, UpdateDepartmentDto } from '../../dto';
import type { DepartmentResponse, DepartmentsPaginatedResponse } from '../../response';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() dto: CreateDepartmentDto): Promise<DepartmentResponse> {
    const data = await this.departmentService.create(dto);
    return {
      success: true,
      message: 'Department created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<DepartmentsPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.departmentService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Departments fetched successfully',
      data,
      meta: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DepartmentResponse> {
    const data = await this.departmentService.findOne(id);
    return {
      success: true,
      message: 'Department fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponse> {
    const data = await this.departmentService.update(id, dto);
    return {
      success: true,
      message: 'Department updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DepartmentResponse> {
    const data = await this.departmentService.remove(id);
    return {
      success: true,
      message: 'Department deleted successfully',
      data,
    };
  }
}