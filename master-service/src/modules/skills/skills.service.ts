import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MasterStatus as DtoMasterStatus } from "../../master-service/enum";
import { PrismaService } from '../../prisma/prisma.service';
import type { createSkillDto, updateSkillDto } from "../../master-service/dto";
import { Skill } from '../../master-service';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  // Added missing mapSkill helper method
  private mapSkill(record: any): Skill {
    return record as Skill;
  }

  async create(dto: createSkillDto): Promise<Skill> {
    try {
      const record = await this.prisma.skill.create({ 
        data: {
          name: dto.name,
          category: dto.category,
        }
      });
      return this.mapSkill(record); // Added missing return statement
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

  async update(id: string, dto: updateSkillDto): Promise<Skill> {
    await this.findOne(id);
    try {
      const record = await this.prisma.skill.update({ 
        where: { id }, 
        data: {
          name: dto.name,
          category: dto.category,
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