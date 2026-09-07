import { Injectable, NotFoundException } from '@nestjs/common';
import { createSocilaplatformDto, updateSocialplatformDto } from '../../master-service/dto';
import { SocialPlatform } from '../../master-service/types';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SocialPlatformService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createSocilaplatformDto): Promise<SocialPlatform> {
    return this.prisma.socialPlatform.create({ data: { ...dto } }) as unknown as SocialPlatform;
  }

  async findAll(): Promise<SocialPlatform[]> {
    return this.prisma.socialPlatform.findMany() as unknown as SocialPlatform[];
  }

  async findOne(id: string): Promise<SocialPlatform> {
    const item = await this.prisma.socialPlatform.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Social Platform not found');
    return item as unknown as SocialPlatform;
  }

  async update(id: string, dto: updateSocialplatformDto): Promise<SocialPlatform> {
    await this.findOne(id);
    const updated = await this.prisma.socialPlatform.update({ where: { id }, data: { ...dto } });
    return updated as unknown as SocialPlatform;
  }

  async remove(id: string): Promise<SocialPlatform> {
    await this.findOne(id);
    const deleted = await this.prisma.socialPlatform.delete({ where: { id } });
    return deleted as unknown as SocialPlatform;
  }
}