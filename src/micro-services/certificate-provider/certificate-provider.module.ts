import { Module } from '@nestjs/common';
import { CertificationProviderService } from './certificate-provider.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CertificationProviderController } from './certificate-provider.controller.js';

@Module({
  controllers: [CertificationProviderController],
  providers: [CertificationProviderService, PrismaService],
  exports: [CertificationProviderService],
})
export class CertificationProviderModule {}