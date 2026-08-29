import { Injectable, NotFoundException } from '@nestjs/common';
import { createSkillDto, updateSkillDto } from '../dto.js';
import { Skill } from '../types.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: createSkillDto): Promise<Skill> {
    return this.prisma.skill.create({ data: { ...dto } }) as unknown as Skill;
  }

  async findAll(): Promise<Skill[]> {
    return this.prisma.skill.findMany() as unknown as Skill[];
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill as unknown as Skill;
  }

  async update(id: string, dto: updateSkillDto): Promise<Skill> {
    await this.findOne(id);
    const updated = await this.prisma.skill.update({ where: { id }, data: { ...dto } });
    return updated as unknown as Skill;
  }

  async remove(id: string): Promise<Skill> {
    await this.findOne(id);
    const deleted = await this.prisma.skill.delete({ where: { id } });
    return deleted as unknown as Skill;
  }
}