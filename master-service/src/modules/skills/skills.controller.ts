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

import { SkillService } from './skills.service';
import { SkillResponse, SkillsPaginatedResponse } from '../../master-service';
import type { createSkillDto, updateSkillDto } from "../../master-service/dto"
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() dto: createSkillDto): Promise<SkillResponse> {
    const data = await this.skillService.create(dto);
    return {
      success: true,
      message: 'Skill created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<SkillsPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.skillService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Skills fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<SkillResponse> {
    const data = await this.skillService.findOne(id);
    return {
      success: true,
      message: 'Skill fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateSkillDto,
  ): Promise<SkillResponse> {
    const data = await this.skillService.update(id, dto);
    return {
      success: true,
      message: 'Skill updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SkillResponse> {
    const data = await this.skillService.remove(id);
    return {
      success: true,
      message: 'Skill deleted successfully',
      data,
    };
  }
}