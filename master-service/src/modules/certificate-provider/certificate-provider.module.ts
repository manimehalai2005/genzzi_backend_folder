import { Module } from '@nestjs/common';
import { CertificationProviderService } from './certificate-provider.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CertificationProviderController } from './certificate-provider.controller';

@Module({
  controllers: [CertificationProviderController],
  providers: [CertificationProviderService, PrismaService],
  exports: [CertificationProviderService],
})
export class CertificationProviderModule {}