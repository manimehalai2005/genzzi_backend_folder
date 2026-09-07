import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import type { createCertificationproviderDto, updateCertificationProviderDto } from '../../master-service/dto';
import { CertificationProviderResponse, CertificationProvidersPaginatedResponse } from '../../master-service/response';
import { CertificationProviderService } from './certificate-provider.service';

@Controller('certification-providers')
export class CertificationProviderController {
  constructor(private readonly providerService: CertificationProviderService) {}

  @Post()
  async create(@Body() dto: createCertificationproviderDto): Promise<CertificationProviderResponse> {
    const data = await this.providerService.create(dto);
    return { success: true, message: 'Certification Provider created successfully', data };
  }

  @Get()
  async findAll(): Promise<CertificationProvidersPaginatedResponse> {
    const data = await this.providerService.findAll();
    return { success: true, message: 'Certification Providers fetched successfully', data, meta: { total: data.length, page: 1, limit: 10, totalPages: 1 } };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CertificationProviderResponse> {
    const data = await this.providerService.findOne(id);
    return { success: true, message: 'Certification Provider fetched successfully', data };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: updateCertificationProviderDto): Promise<CertificationProviderResponse> {
    const data = await this.providerService.update(id, dto);
    return { success: true, message: 'Certification Provider updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CertificationProviderResponse> {
    const data = await this.providerService.remove(id);
    return { success: true, message: 'Certification Provider deleted successfully', data };
  }
}