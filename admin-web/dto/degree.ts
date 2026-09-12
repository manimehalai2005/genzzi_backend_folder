export interface CreateDegreeDto {
  name: string;
  code?: string;
  level?: string;
}

export interface UpdateDegreeDto extends Partial<CreateDegreeDto> {
  status?: string;
}