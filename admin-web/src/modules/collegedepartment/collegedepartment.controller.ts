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


import { CollegeDepartmentService } from './collegedepartment.service';
import { CollegeDepartmentResponse, CollegeDepartmentsPaginatedResponse } from '../../master-service';
import type { createCollegeDepartmentDto, updateCollegeDepartmentDto } from "../../master-service/dto"


@Controller('college-departments')
export class CollegeDepartmentController {
  constructor(private readonly collegeDepartmentService: CollegeDepartmentService) {}

  @Post()
  async create(@Body() dto: createCollegeDepartmentDto): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.create(dto);
    return {
      success: true,
      message: 'College Department created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<CollegeDepartmentsPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.collegeDepartmentService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'College Departments fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.findOne(id);
    return {
      success: true,
      message: 'College Department fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateCollegeDepartmentDto,
  ): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.update(id, dto);
    return {
      success: true,
      message: 'College Department updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CollegeDepartmentResponse> {
    const data = await this.collegeDepartmentService.remove(id);
    return {
      success: true,
      message: 'College Department deleted successfully',
      data,
    };
  }
}