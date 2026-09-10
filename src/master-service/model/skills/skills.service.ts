import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateSkillDto, UpdateSkillDto } from '../../dto';
import { MasterStatus as DtoMasterStatus } from "../../enum";
import { PrismaService } from '../../../prisma/prisma.service';
import { MasterStatus as PrismaMasterStatus } from '../../../generated/client';
import { Skill } from '../../types';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  private mapStatusToPrisma(status?: DtoMasterStatus): PrismaMasterStatus | undefined {
    if (!status) return undefined;
    return status === DtoMasterStatus.ACTIVE 
      ? PrismaMasterStatus.ACTIVE 
      : PrismaMasterStatus.INACTIVE;
  }

  private mapStatusFromPrisma(status: PrismaMasterStatus): DtoMasterStatus {
    return status === PrismaMasterStatus.ACTIVE 
      ? DtoMasterStatus.ACTIVE 
      : DtoMasterStatus.INACTIVE;
  }

  private mapSkill(record: { id: string; name: string; category: string | null; status: PrismaMasterStatus; createdAt: Date }): Skill {
    return {
      id: record.id,
      name: record.name,
      category: record.category,
      status: this.mapStatusFromPrisma(record.status),
      createdAt: record.createdAt,
    };
  }

  async create(dto: CreateSkillDto): Promise<Skill> {
    try {
      const record = await this.prisma.skill.create({ 
        data: {
          name: dto.name,
          category: dto.category,
          status: this.mapStatusToPrisma(dto.status),
        }
      });
      return this.mapSkill(record);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('A skill with this name already exists.');
      }
      throw error;
    }
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Skill[]; total: number }> {
    const skip = (page - 1) * limit;
    const [records, total] = await Promise.all([
      this.prisma.skill.findMany({ skip, take: limit }),
      this.prisma.skill.count(),
    ]);
    return { data: records.map((record) => this.mapSkill(record)), total };
  }

  async findOne(id: string): Promise<Skill> {
    const record = await this.prisma.skill.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Skill not found');
    return this.mapSkill(record);
  }

  async update(id: string, dto: UpdateSkillDto): Promise<Skill> {
    await this.findOne(id);
    try {
      const record = await this.prisma.skill.update({ 
        where: { id }, 
        data: {
          name: dto.name,
          category: dto.category,
          status: this.mapStatusToPrisma(dto.status),
        }
      });
      return this.mapSkill(record);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('A skill with this name already exists.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Skill> {
    await this.findOne(id);
    const record = await this.prisma.skill.delete({ where: { id } });
    return this.mapSkill(record);
  }
}