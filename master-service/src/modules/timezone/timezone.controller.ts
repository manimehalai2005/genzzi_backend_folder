import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import type { updateTimeZoneDto ,creatTimeZoneDto } from '../../master-service/dto';

import { TimezoneService } from './timezone.service';
import { TimezoneResponse, TimezonesPaginatedResponse } from '../../master-service';


@Controller('timezones')
export class TimezoneController {
  constructor(private readonly timezoneService: TimezoneService) {}

  @Post()
  async create(@Body() dto:creatTimeZoneDto): Promise<TimezoneResponse> {
    return this.timezoneService.create(dto);
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<TimezonesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    return this.timezoneService.findAll(parsedPage, parsedLimit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TimezoneResponse> {
    return this.timezoneService.findOne(id);
  }
@Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateTimeZoneDto,
  ): Promise<TimezoneResponse> {
    console.log("PUT Request Received for ID:", id); 
    return this.timezoneService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TimezoneResponse> {
    return this.timezoneService.remove(id);
  }
}