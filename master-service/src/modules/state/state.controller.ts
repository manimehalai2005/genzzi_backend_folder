import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { StateService } from './state.service';
import type { createStateDto, updateStateDto } from '../../master-service/dto';
import { State, StateResponse, StatesPaginatedResponse } from '../../master-service';


@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  async create(@Body() dto: createStateDto): Promise<StateResponse> {
    try {
      const data = (await this.stateService.create(dto)) as State;
      return {
        success: true,
        message: 'State created successfully',
        data,
      };
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ): Promise<StatesPaginatedResponse> {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const { data, total } = await this.stateService.findAll(parsedPage, parsedLimit);

    return {
      success: true,
      message: 'States fetched successfully',
      data: data as State[],
      meta: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StateResponse> {
    const data = (await this.stateService.findOne(id)) as State;
    return {
      success: true,
      message: 'State fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateStateDto,
  ): Promise<StateResponse> {
    const data = (await this.stateService.update(id, dto)) as State;
    return {
      success: true,
      message: 'State updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<StateResponse> {
    const data = (await this.stateService.remove(id)) as State;
    return {
      success: true,
      message: 'State deleted successfully',
      data,
    };
  }
}