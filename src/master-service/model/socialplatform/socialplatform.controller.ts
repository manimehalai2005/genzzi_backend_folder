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

import type { CreateSocialPlatformDto, UpdateSocialPlatformDto } from '../../dto';
import type { SocialPlatformResponse, SocialPlatformsPaginatedResponse } from '../../response';
import { SocialPlatformService } from './socialplatform.service';

@Controller('social-platforms')
export class SocialPlatformController {
  constructor(private readonly socialPlatformService: SocialPlatformService) {}

  @Post()
  async create(@Body() dto: CreateSocialPlatformDto): Promise<SocialPlatformResponse> {
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
    @Body() dto: UpdateSocialPlatformDto,
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