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
import { DegreeService } from './degree.service';
import { DegreeResponse, DegreesPaginatedResponse } from '../../master-service';
import type { createDegreeDto, updateDegreeDto } from "../../master-service/dto"


@Controller('degrees')
export class DegreeController {
  constructor(private readonly degreeService: DegreeService) {}

  @Post()
  async create(@Body() dto: createDegreeDto): Promise<DegreeResponse> {
    const data = await this.degreeService.create(dto);
    return {
      success: true,
      message: 'Degree created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<DegreesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.degreeService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Degrees fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<DegreeResponse> {
    const data = await this.degreeService.findOne(id);
    return {
      success: true,
      message: 'Degree fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateDegreeDto,
  ): Promise<DegreeResponse> {
    const data = await this.degreeService.update(id, dto);
    return {
      success: true,
      message: 'Degree updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DegreeResponse> {
    const data = await this.degreeService.remove(id);
    return {
      success: true,
      message: 'Degree deleted successfully',
      data,
    };
  }
}