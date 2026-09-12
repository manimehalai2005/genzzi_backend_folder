export interface CreateCityDto {
  name: string;
  stateId: string;
}

export interface UpdateCityDto extends Partial<CreateCityDto> {}