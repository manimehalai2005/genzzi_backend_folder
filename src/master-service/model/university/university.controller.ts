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
import { UniversityService } from './university.service';
import type { CreateUniversityDto, UpdateUniversityDto } from '../../dto';
import type { UniversitiesPaginatedResponse, UniversityResponse } from '../../response';


@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
async create(
  @Body() dto: CreateUniversityDto,
): Promise<UniversityResponse> {
  const data = await this.universityService.create(dto);

  return {
    success: true,
    message: 'University created successfully',
    data, // ❌ இங்கே type mismatch
  };
}

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<UniversitiesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.universityService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'Universities fetched successfully',
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
  async findOne(@Param('id') id: string): Promise<UniversityResponse> {
    const data = await this.universityService.findOne(id);
    return {
      success: true,
      message: 'University fetched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUniversityDto,
  ): Promise<UniversityResponse> {
    const data = await this.universityService.update(id, dto);
    return {
      success: true,
      message: 'University updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UniversityResponse> {
    const data = await this.universityService.remove(id);
    return {
      success: true,
      message: 'University deleted successfully',
      data,
    };
  }
}