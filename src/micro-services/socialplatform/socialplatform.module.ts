import { Module } from '@nestjs/common';
import { SocialPlatformController } from './socialplatform.controller.js';
import { SocialPlatformService } from './socialplatform.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Module({
  controllers: [SocialPlatformController],
  providers: [SocialPlatformService, PrismaService],
  exports: [SocialPlatformService],
})
export class SocialPlatformModule {}