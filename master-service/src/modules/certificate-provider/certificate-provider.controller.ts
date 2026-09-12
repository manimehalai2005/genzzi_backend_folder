import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';

import { CertificationProviderService } from './certificate-provider.service';
import { CertificationProviderResponse, CertificationProvidersPaginatedResponse,  } from '../../master-service';
import  type {createCertificationproviderDto, updateCertificationProviderDto,} from "../../master-service/dto"


@Controller('certification-providers')
export class CertificationProviderController {
  constructor(
    private readonly providerService: CertificationProviderService,
  ) {}

  // POST /certification-providers
  @Post()
  async create(
    @Body() dto: createCertificationproviderDto,
  ): Promise<CertificationProviderResponse> {
    const data = await this.providerService.create(dto);

    return {
      success: true,
      message: 'Certification Provider created successfully',
      data,
    };
  }

  // GET /certification-providers
  @Get()
  async findAll(): Promise<CertificationProvidersPaginatedResponse> {
    const data = await this.providerService.findAll();
    
    // Check if data is an array or object, and handle safely
    const items = Array.isArray(data) ? data : data.data;
    const total = Array.isArray(data) ? data.length : data.total;

    return {
      success: true,
      message: 'Certification Providers fetched successfully',
      data: items,
      meta: {
        total: total,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  }

  // GET /certification-providers/:id
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<CertificationProviderResponse> {
    const data = await this.providerService.findOne(id);

    return {
      success: true,
      message: 'Certification Provider fetched successfully',
      data,
    };
  }

  // PATCH /certification-providers/:id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: updateCertificationProviderDto,
  ): Promise<CertificationProviderResponse> {
    const data = await this.providerService.update(id, dto);

    return {
      success: true,
      message: 'Certification Provider updated successfully',
      data,
    };
  }

  // DELETE /certification-providers/:id
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<CertificationProviderResponse> {
    const data = await this.providerService.remove(id);

    return {
      success: true,
      message: 'Certification Provider deleted successfully',
      data,
    };
  }
}