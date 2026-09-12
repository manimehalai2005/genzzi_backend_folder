export interface CreateCollegeDepartmentDto {
  collegeId: string;
  departmentId: string;
}

export interface UpdateCollegeDepartmentDto extends Partial<CreateCollegeDepartmentDto> {}