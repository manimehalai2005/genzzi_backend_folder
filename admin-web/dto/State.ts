export interface CreateStateDto {
  name: string;
  code?: string;
  countryId: string;
}

export interface UpdateStateDto extends Partial<CreateStateDto> {}