export interface CreateDepartmentDto {
  name: string;
  code: string;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {}