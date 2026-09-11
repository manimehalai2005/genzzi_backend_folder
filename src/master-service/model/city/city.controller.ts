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
import { CityService } from './city.service';
import type { CreateCityDto, UpdateCityDto} from '../../dto';
import type { CityResponse, CitiesPaginatedResponse } from '../../response';
import { City } from '../../../generated/client';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() dto: CreateCityDto): Promise<CityResponse> {
    const data = (await this.cityService.create(dto)) as City;
    return {
      success: true,
      message: 'City created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<CitiesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.cityService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Cities fetched successfully',
      data: data as City[],
      meta: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CityResponse> {
    const data = (await this.cityService.findOne(id)) as City;
    return {
      success: true,
      message: 'City fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCityDto,
  ): Promise<CityResponse> {
    const data = (await this.cityService.update(id, dto)) as City;
    return {
      success: true,
      message: 'City updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CityResponse> {
    const data = (await this.cityService.remove(id)) as City;
    return {
      success: true,
      message: 'City deleted successfully',
      data,
    };
  }
}