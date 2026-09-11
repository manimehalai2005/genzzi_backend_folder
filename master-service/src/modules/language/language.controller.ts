import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LanguageService } from './language.service';
import type { createLanguageDto, updateLanguageDto } from '../../master-service/dto';
import { LanguageResponse, LanguagesPaginatedResponse } from '../../master-service/response';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  async create(@Body() dto: createLanguageDto): Promise<LanguageResponse> {
    const data = await this.languageService.create(dto);
    return { success: true, message: 'Language created successfully', data };
  }

  @Get()
  async findAll(): Promise<LanguagesPaginatedResponse> {
    const data = await this.languageService.findAll();
    return { 
      success: true, 
      message: 'Languages fetched successfully', 
      data, 
      meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } 
    };
  }

  @Get(':code')
  async findOne(@Param('code') code: string): Promise<LanguageResponse> {
    const data = await this.languageService.findOne(code);
    return { success: true, message: 'Language fetched successfully', data };
  }

  @Put(':code')
  async update(@Param('code') code: string, @Body() dto: updateLanguageDto): Promise<LanguageResponse> {
    const data = await this.languageService.update(code, dto);
    return { success: true, message: 'Language updated successfully', data };
  }

  @Delete(':code')
  async remove(@Param('code') code: string): Promise<LanguageResponse> {
    const data = await this.languageService.remove(code);
    return { success: true, message: 'Language deleted successfully', data };
  }
}