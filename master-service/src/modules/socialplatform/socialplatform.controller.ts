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


import { SocialPlatformService } from './socialplatform.service';
import { SocialPlatformResponse, SocialPlatformsPaginatedResponse } from '../../master-service';
import type {createSocilaplatformDto, updateSocialplatformDto,} from "../../master-service/dto"

@Controller('social-platforms')
export class SocialPlatformController {
  constructor(private readonly socialPlatformService: SocialPlatformService) {}

  @Post()
  async create(@Body() dto: createSocilaplatformDto): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.create(dto);
    return {
      success: true,
      message: 'Social platform created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<SocialPlatformsPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.socialPlatformService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Social platforms fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.findOne(id);
    return {
      success: true,
      message: 'Social platform fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateSocialplatformDto,
  ): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.update(id, dto);
    return {
      success: true,
      message: 'Social platform updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.remove(id);
    return {
      success: true,
      message: 'Social platform deleted successfully',
      data,
    };
  }
}