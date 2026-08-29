import { Injectable, NotFoundException } from '@nestjs/common';
import { createCertificationproviderDto, updateCertificationProviderDto } from '../dto.js';
import { CertificationProvider } from '../types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class CertificationProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCertificationproviderDto): Promise<CertificationProvider> {
    return this.prisma.certificationProvider.create({ data: { ...dto } }) as unknown as CertificationProvider;
  }

  async findAll(): Promise<CertificationProvider[]> {
    return this.prisma.certificationProvider.findMany() as unknown as CertificationProvider[];
  }

  async findOne(id: string): Promise<CertificationProvider> {
    const item = await this.prisma.certificationProvider.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Certification Provider not found');
    return item as unknown as CertificationProvider;
  }

  async update(id: string, dto: updateCertificationProviderDto): Promise<CertificationProvider> {
    await this.findOne(id);
    const updated = await this.prisma.certificationProvider.update({ where: { id }, data: { ...dto } });
    return updated as unknown as CertificationProvider;
  }

  async remove(id: string): Promise<CertificationProvider> {
    await this.findOne(id);
    const deleted = await this.prisma.certificationProvider.delete({ where: { id } });
    return deleted as unknown as CertificationProvider;
  }
}