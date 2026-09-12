export interface CreateUniversityDto {
  name: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  website?: string;
}

export interface UpdateUniversityDto extends Partial<CreateUniversityDto> {}
