import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SkillService } from './skills.service';
import type  { createSkillDto, updateSkillDto } from '../../master-service/dto';
import { SkillResponse, SkillsPaginatedResponse } from '../../master-service/response';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() dto: createSkillDto): Promise<SkillResponse> {
    const data = await this.skillService.create(dto);
    return { success: true, message: 'Skill created successfully', data };
  }

  @Get()
  async findAll(): Promise<SkillsPaginatedResponse> {
    const data = await this.skillService.findAll();
    return { 
      success: true, 
      message: 'Skills fetched successfully', 
      data, 
      meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } 
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SkillResponse> {
    const data = await this.skillService.findOne(id);
    return { success: true, message: 'Skill fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateSkillDto): Promise<SkillResponse> {
    const data = await this.skillService.update(id, dto);
    return { success: true, message: 'Skill updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SkillResponse> {
    const data = await this.skillService.remove(id);
    return { success: true, message: 'Skill deleted successfully', data };
  }
}