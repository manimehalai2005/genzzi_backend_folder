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
import { IndustryService } from './industry.service';
import type { CreateIndustryDto, UpdateIndustryDto } from '../../dto';
import type { IndustryResponse, IndustriesPaginatedResponse } from '../../response';

@Controller('industries')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Post()
  async create(@Body() dto: CreateIndustryDto): Promise<IndustryResponse> {
    const data = await this.industryService.create(dto);
    return {
      success: true,
      message: 'Industry created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<IndustriesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.industryService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Industries fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<IndustryResponse> {
    const data = await this.industryService.findOne(id);
    return {
      success: true,
      message: 'Industry fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateIndustryDto,
  ): Promise<IndustryResponse> {
    const data = await this.industryService.update(id, dto);
    return {
      success: true,
      message: 'Industry updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IndustryResponse> {
    const data = await this.industryService.remove(id);
    return {
      success: true,
      message: 'Industry deleted successfully',
      data,
    };
  }
}