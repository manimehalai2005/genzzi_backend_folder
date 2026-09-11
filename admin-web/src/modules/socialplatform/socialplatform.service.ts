import { Injectable, NotFoundException } from '@nestjs/common';
import type { updateSocialplatformDto ,createSocilaplatformDto} from "../../master-service/dto"
import { PrismaService } from '../../prisma/prisma.service';
import { SocialPlatform } from '../../master-service';

@Injectable()
export class SocialPlatformService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createSocilaplatformDto): Promise<SocialPlatform> {
    const result = await this.prisma.socialPlatform.create({ data: dto });
    return result as SocialPlatform;
  }

  async findAll(page = 1, limit = 10): Promise<{ data: SocialPlatform[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.socialPlatform.findMany({ skip, take: limit }),
      this.prisma.socialPlatform.count(),
    ]);
    return { data: data as SocialPlatform[], total };
  }

  async findOne(id: string): Promise<SocialPlatform> {
    const item = await this.prisma.socialPlatform.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Social platform not found');
    return item as SocialPlatform;
  }

  async update(id: string, dto: updateSocialplatformDto): Promise<SocialPlatform> {
    await this.findOne(id);
    const result = await this.prisma.socialPlatform.update({ where: { id }, data: dto });
    return result as SocialPlatform;
  }

  async remove(id: string): Promise<SocialPlatform> {
    await this.findOne(id);
    const result = await this.prisma.socialPlatform.delete({ where: { id } });
    return result as SocialPlatform;
  }
}