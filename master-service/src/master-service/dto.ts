import { MasterStatus } from "../generated/prisma/enums";

export interface createSocilaplatformDto {
    name: string;
    website?: string;
    icon?: string;
}
export interface updateSocialplatformDto {
    name?: string;
    website?: string;
    icon?: string;
}

export interface createCollegeDto {
    code?: string;
    name: string;
    shortName?: string;
    website?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
}

export interface updateCollegeDto {
    code?: string;
    name?: string;
    shortName?: string;
    website?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
}

export interface createDepartmentDto {
    code?: string;
    name: string;
}

export interface updateDepartmentDto {
    code?: string;
    name?: string;
}

export interface createCollegeDepartmentDto {
    collegeId: string;
    departmentId: string;
}

export interface updateCollegeDepartmentDto {
    collegeId?: string;
    departmentId?: string;
}

export interface createindustryDto {
    name: string;
    description?: string;
}

export interface updateindustryDto {
    name?: string;
    description?: string;
}

export interface createDegreeDto {
    name: string;
    level?: string;
}
export interface updateDegreeDto {
    name?: string;
    level?: string;
}

export interface createUniversityDto {
    name: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
    website?: string;
}

export interface updateUniversityDto {
    name?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
    website?: string; 
}

export interface createFileTypeDto {
    extension: string;
    mimeType: string;
    category?: string;
}

export interface updateFileTypeDto {
    extension?: string;
    mimeType?: string;
    category?: string;
}

export interface createCertificationproviderDto {
    name: string;
    website?: string;
}
export interface updateCertificationProviderDto {
    name?: string;
    website?: string;
}

export interface createLanguageDto {
    code: string;
    name: string;
    nativeName?: string; 
}
export interface updateLanguageDto {
    code?: string;
    name?: string;
    nativeName?: string; 
}

export interface CreatecurrencyDto {
    code: string;
    name: string;
    symbol?: string;
}
export interface UpdatecurrencyDto {
    code?: string;
    name?: string;
    symbol?: string;
}

export interface creatTimeZoneDto {
    name: string;
    utcOffset: string;
}

export interface updateTimeZoneDto {
    name?: string;
    utcOffset?: string; 
}

export interface createSkillDto {
    name: string;
    category?: string;
}
export interface updateSkillDto {
    name?: string;
    category?: string;
}

export interface createCityDto {
    stateId: string;
    name: string;
}

export interface updateCityDto {
    stateId?: string;
    name?: string; 
}

export interface createStateDto {
    countryId: string;
    name: string; 
    code?: string;
}

export interface updateStateDto {
    countryId?: string; 
    name?: string;
    code?: string;
}

export interface createCountryDto {
    iso2: string;
    iso3: string;
    name: string;
    phoneCode?: string;
    currencyCode?: string;
    emoji?: string;
    status?: MasterStatus; 
}
export interface updateCountryDto {
    iso2?: string;
    iso3?: string;
    name?: string;
    phoneCode?: string;
    currencyCode?: string;
    emoji?: string;
    status?: MasterStatus;
}