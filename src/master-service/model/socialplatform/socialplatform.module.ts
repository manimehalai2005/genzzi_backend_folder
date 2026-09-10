import { Module } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service';
import { SocialPlatformController } from './socialplatform.controller';
import { SocialPlatformService } from './socialplatform.service';

@Module({
  controllers: [SocialPlatformController],
  providers: [SocialPlatformService, PrismaService],
  exports: [SocialPlatformService],
})
export class SocialPlatformModule {}