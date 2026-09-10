import { MasterStatus } from "./enum";



export interface CreateCountryDto {
  iso2: string;
  iso3: string;
  name: string;
  phoneCode?: string;
  currencyCode?: string;
  emoji?: string;
  status?: MasterStatus;
}

export interface UpdateCountryDto extends Partial<CreateCountryDto> {}


export interface CreateStateDto {
  countryId: string;
  name: string;
  code?: string;
}

export interface UpdateStateDto extends Partial<CreateStateDto> {}


export interface CreateCityDto {
  stateId: string;
  name: string;
}

export interface UpdateCityDto extends Partial<CreateCityDto> {}


export interface CreateLanguageDto {
  code: string;
  name: string;
  nativeName?: string;
  status?: MasterStatus;
}

export interface UpdateLanguageDto extends Partial<CreateLanguageDto> {}


export interface CreateCurrencyDto {
  code: string;
  name: string;
  symbol?: string;
}

export interface UpdateCurrencyDto extends Partial<CreateCurrencyDto> {}


export interface CreateTimezoneDto {
  name: string;
  utcOffset: string;
}

export interface UpdateTimezoneDto extends Partial<CreateTimezoneDto> {}


export interface CreateSkillDto {
  name: string;
  category?: string;
  status?: MasterStatus;
}

export interface UpdateSkillDto extends Partial<CreateSkillDto> {}


export interface CreateIndustryDto {
  name: string;
  description?: string;
}

export interface UpdateIndustryDto extends Partial<CreateIndustryDto> {}


export interface CreateDegreeDto {
  name: string;
  level?: string;
}

export interface UpdateDegreeDto extends Partial<CreateDegreeDto> {}


export interface CreateUniversityDto {
  name: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  website?: string;
}

export interface UpdateUniversityDto extends Partial<CreateUniversityDto> {}


export interface CreateCertificationProviderDto {
  name: string;
  website?: string;
}

export interface UpdateCertificationProviderDto extends Partial<CreateCertificationProviderDto> {}


export interface CreateFileTypeDto {
  extension: string;
  mimeType: string;
  category?: string;
}

export interface UpdateFileTypeDto extends Partial<CreateFileTypeDto> {}


export interface CreateSocialPlatformDto {
  name: string;
  website?: string;
  icon?: string;
}

export interface UpdateSocialPlatformDto extends Partial<CreateSocialPlatformDto> {}

export interface CreateCollegeDto {
  code?: string;
  name: string;
  shortName?: string;
  website?: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
}

export interface UpdateCollegeDto extends Partial<CreateCollegeDto> {}

export interface CreateDepartmentDto {
  code?: string;
  name: string;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {}

export interface CreateCollegeDepartmentDto {
  collegeId: string;
  departmentId: string;
}

export interface UpdateCollegeDepartmentDto extends Partial<CreateCollegeDepartmentDto> {}