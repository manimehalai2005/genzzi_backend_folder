export interface CreateSkillDto {
  name: string;
  category?: string;
  
}

export interface UpdateSkillDto extends Partial<CreateSkillDto> {
  status?: string;
}