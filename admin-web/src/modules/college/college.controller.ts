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
import { CollegeService } from './college.service';
import { CollegeResponse, CollegesPaginatedResponse } from '../../master-service';
import type { createCollegeDto, updateCollegeDto }  from "../../master-service/dto"


@Controller('colleges')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Post()
  async create(@Body() dto: createCollegeDto): Promise<CollegeResponse> {
    const data = await this.collegeService.create(dto);
    return {
      success: true,
      message: 'College created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<CollegesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.collegeService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Colleges fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<CollegeResponse> {
    const data = await this.collegeService.findOne(id);
    return {
      success: true,
      message: 'College fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateCollegeDto,
  ): Promise<CollegeResponse> {
    const data = await this.collegeService.update(id, dto);
    return {
      success: true,
      message: 'College updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CollegeResponse> {
    const data = await this.collegeService.remove(id);
    return {
      success: true,
      message: 'College deleted successfully',
      data,
    };
  }
}