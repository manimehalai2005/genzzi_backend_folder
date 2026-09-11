import { Injectable, NotFoundException } from '@nestjs/common';


import { PrismaService } from '../../prisma/prisma.service';
import { CertificationProvider, createCertificationproviderDto, updateCertificationProviderDto } from '../../master-service';




@Injectable()
export class CertificationProviderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createCertificationproviderDto): Promise<CertificationProvider> {
    return this.prisma.certificationProvider.create({ 
      data: dto 
    });
  }

  async findAll(page = 1, limit = 10): Promise<{ data: CertificationProvider[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.certificationProvider.findMany({ skip, take: limit }),
      this.prisma.certificationProvider.count(),
    ]);
    return { data, total };
  }

  async findOne(id: string): Promise<CertificationProvider> {
    const item = await this.prisma.certificationProvider.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Certification Provider not found');
    return item;
  }

async update(id: string, dto: updateCertificationProviderDto): Promise<CertificationProvider> {
  await this.findOne(id);
  const cleanedData = {
    ...(dto.name && { name: dto.name }),
    ...(dto.website !== undefined && { website: dto.website || null }),
  };

  return this.prisma.certificationProvider.update({ 
    where: { id }, 
    data: cleanedData 
  });
}

  async remove(id: string): Promise<CertificationProvider> {
    await this.findOne(id);
    return this.prisma.certificationProvider.delete({ where: { id } });
  }
}