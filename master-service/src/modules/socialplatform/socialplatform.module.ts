import { Module } from '@nestjs/common';


import { SocialPlatformController } from './socialplatform.controller';
import { SocialPlatformService } from './socialplatform.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [SocialPlatformController],
  providers: [SocialPlatformService, PrismaService],
  exports: [SocialPlatformService],
})
export class SocialPlatformModule {}