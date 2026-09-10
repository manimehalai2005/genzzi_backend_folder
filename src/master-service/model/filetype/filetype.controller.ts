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

import type { CreateFileTypeDto, UpdateFileTypeDto,  } from '../../dto';
import { ApiPaginatedResponse, ApiResponse } from '../../response';
import { FileType } from '../../types';
import { FileTypeService } from './filetype.service';

type FileTypeResponse = ApiResponse<FileType>;
type FileTypesPaginatedResponse = ApiPaginatedResponse<FileType>;

@Controller('file-types')
export class FileTypeController {
  constructor(private readonly fileTypeService: FileTypeService) {}

  @Post()
  async create(@Body() dto: CreateFileTypeDto): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.create(dto);
    return {
      success: true,
      message: 'File type created successfully',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<FileTypesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.fileTypeService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'File types fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.findOne(id);
    return {
      success: true,
      message: 'File type fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFileTypeDto,
  ): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.update(id, dto);
    return {
      success: true,
      message: 'File type updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.remove(id);
    return {
      success: true,
      message: 'File type deleted successfully',
      data,
    };
  }
}