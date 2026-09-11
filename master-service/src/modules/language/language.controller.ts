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
import { LanguageService } from './language.service';
import { Language, LanguageResponse, LanguagesPaginatedResponse } from '../../master-service';
import type { createLanguageDto, updateLanguageDto } from "../../master-service/dto"




@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  async create(@Body() dto: createLanguageDto): Promise<LanguageResponse> {
    const data = (await this.languageService.create(dto)) as Language;
    return {
      success: true,
      message: 'Language created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<LanguagesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.languageService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Languages fetched successfully',
      data: data as Language[],
      meta: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LanguageResponse> {
    const data = (await this.languageService.findOne(id)) as Language;
    return {
      success: true,
      message: 'Language fetched successfully',
      data,
    };
  }
@Put(':id')
async update(
  @Param('id') code: string,
  @Body() dto: updateLanguageDto,
): Promise<LanguageResponse> {
  const data = await this.languageService.update(code, dto);

  return {
    success: true,
    message: 'Language updated successfully',
    data: data as Language,
  };
}
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LanguageResponse> {
    const data = (await this.languageService.remove(id)) as Language;
    return {
      success: true,
      message: 'Language deleted successfully',
      data,
    };
  }
}