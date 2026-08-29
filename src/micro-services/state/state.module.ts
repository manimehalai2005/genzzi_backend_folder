import { Module } from '@nestjs/common';
import { StateService } from './state.service.js';
import { StateController } from './state.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
@Module({
  controllers: [StateController],
  providers: [StateService],
  imports:[PrismaModule]
})
export class StateModule {}
