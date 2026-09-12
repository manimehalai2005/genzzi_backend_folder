export interface CreateCollegeDto {
  code?: string;
  name: string;
  shortName?: string;
  website?: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
}

// Inga irundha status?: string;-ah remove panniyachu
export interface UpdateCollegeDto extends Partial<CreateCollegeDto> {}