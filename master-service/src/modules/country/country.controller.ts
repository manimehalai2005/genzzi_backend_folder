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
import { CountryService } from './country.service';
import { CountriesPaginatedResponse, Country, CountryResponse } from '../../master-service';
import type { createCountryDto, updateCountryDto } from "../../master-service/dto"


@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(@Body() dto: createCountryDto): Promise<CountryResponse> {
    const data = (await this.countryService.create(dto)) as Country;
    return {
      success: true,
      message: 'Country created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<CountriesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.countryService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Countries fetched successfully',
      data: data as Country[],
      meta: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CountryResponse> {
    const data = (await this.countryService.findOne(id)) as Country;
    return {
      success: true,
      message: 'Country fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateCountryDto,
  ): Promise<CountryResponse> {
    const data = (await this.countryService.update(id, dto)) as Country;
    return {
      success: true,
      message: 'Country updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CountryResponse> {
    const data = (await this.countryService.remove(id)) as Country;
    return {
      success: true,
      message: 'Country deleted successfully',
      data,
    };
  }
}