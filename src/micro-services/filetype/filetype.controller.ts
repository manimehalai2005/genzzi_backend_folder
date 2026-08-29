import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import  type { createFileTypeDto, updateFileTypeDto } from '../dto.js';
import { FileTypeResponse, FileTypesPaginatedResponse } from '../response.js';
import { FileTypeService } from './filetype.service.js';

@Controller('file-types')
export class FileTypeController {
  constructor(private readonly fileTypeService: FileTypeService) {}

  @Post()
  async create(@Body() dto: createFileTypeDto): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.create(dto);
    return { success: true, message: 'File Type created successfully', data };
  }

  @Get()
  async findAll(): Promise<FileTypesPaginatedResponse> {
    const data = await this.fileTypeService.findAll();
    return { success: true, message: 'File Types fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.findOne(id);
    return { success: true, message: 'File Type fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateFileTypeDto): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.update(id, dto);
    return { success: true, message: 'File Type updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<FileTypeResponse> {
    const data = await this.fileTypeService.remove(id);
    return { success: true, message: 'File Type deleted successfully', data };
  }
}