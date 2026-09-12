export interface CreateIndustryDto {
  name: string;
  code?: string;
  description?: string;
}

export interface UpdateIndustryDto extends Partial<CreateIndustryDto> {
  status?: string;
}