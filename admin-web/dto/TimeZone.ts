export interface CreateTimezoneDto {
  name: string;
  utcOffset: string;
}

export interface UpdateTimezoneDto extends Partial<CreateTimezoneDto> {}