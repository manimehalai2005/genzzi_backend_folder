import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import type  { createSocilaplatformDto, updateSocialplatformDto } from '../dto.js';
import { SocialPlatformResponse, SocialPlatformsPaginatedResponse } from '../response.js';
import { SocialPlatformService } from './socialplatform.service.js';

@Controller('social-platforms')
export class SocialPlatformController {
  constructor(private readonly socialPlatformService: SocialPlatformService) {}

  @Post()
  async create(@Body() dto: createSocilaplatformDto): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.create(dto);
    return { success: true, message: 'Social Platform created successfully', data };
  }

  @Get()
  async findAll(): Promise<SocialPlatformsPaginatedResponse> {
    const data = await this.socialPlatformService.findAll();
    return { success: true, message: 'Social Platforms fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.findOne(id);
    return { success: true, message: 'Social Platform fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateSocialplatformDto): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.update(id, dto);
    return { success: true, message: 'Social Platform updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SocialPlatformResponse> {
    const data = await this.socialPlatformService.remove(id);
    return { success: true, message: 'Social Platform deleted successfully', data };
  }
}