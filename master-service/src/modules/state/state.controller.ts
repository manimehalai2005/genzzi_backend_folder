import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { StateService } from './state.service';
import type { createStateDto, updateStateDto } from '../../master-service/dto';
import type { StateResponse, StatesPaginatedResponse } from '../../master-service/response';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() dto: createStateDto): Promise<StateResponse> {
    return this.stateService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<StatesPaginatedResponse> {
    return this.stateService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StateResponse> {
    return this.stateService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: updateStateDto,
  ): Promise<StateResponse> {
    return this.stateService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<StateResponse> {
    return this.stateService.remove(id);
  }
}