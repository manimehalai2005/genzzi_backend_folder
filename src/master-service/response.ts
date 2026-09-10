import {Country,State,City,Language,Currency,Timezone,Skill,Industry,Degree,University,CertificationProvider,FileType,SocialPlatform,College,Department,CollegeDepartment} from "./types";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface ApiPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export type CountryResponse = ApiResponse<Country>;
export type CountriesPaginatedResponse = ApiPaginatedResponse<Country>;

export type StateResponse = ApiResponse<State>;
export type StatesPaginatedResponse = ApiPaginatedResponse<State>;

export type CityResponse = ApiResponse<City>;
export type CitiesPaginatedResponse = ApiPaginatedResponse<City>;

export type LanguageResponse = ApiResponse<Language>;
export type LanguagesPaginatedResponse = ApiPaginatedResponse<Language>;

export type CurrencyResponse = ApiResponse<Currency>;
export type CurrenciesPaginatedResponse = ApiPaginatedResponse<Currency>;

export type TimezoneResponse = ApiResponse<Timezone>;
export type TimezonesPaginatedResponse = ApiPaginatedResponse<Timezone>;

export type SkillResponse = ApiResponse<Skill>;
export type SkillsPaginatedResponse = ApiPaginatedResponse<Skill>;

export type IndustryResponse = ApiResponse<Industry>;
export type IndustriesPaginatedResponse = ApiPaginatedResponse<Industry>;

export type DegreeResponse = ApiResponse<Degree>;
export type DegreesPaginatedResponse = ApiPaginatedResponse<Degree>;

export type UniversityResponse = ApiResponse<University>;
export type UniversitiesPaginatedResponse = ApiPaginatedResponse<University>;

export type CertificationProviderResponse = ApiResponse<CertificationProvider>;
export type CertificationProvidersPaginatedResponse = ApiPaginatedResponse<CertificationProvider>;

export type FileTypeResponse = ApiResponse<FileType>;
export type FileTypesPaginatedResponse = ApiPaginatedResponse<FileType>;

export type SocialPlatformResponse = ApiResponse<SocialPlatform>;
export type SocialPlatformsPaginatedResponse = ApiPaginatedResponse<SocialPlatform>;

export type CollegeResponse = ApiResponse<College>;
export type CollegesPaginatedResponse = ApiPaginatedResponse<College>;

export type DepartmentResponse = ApiResponse<Department>;
export type DepartmentsPaginatedResponse = ApiPaginatedResponse<Department>;

export type CollegeDepartmentResponse = ApiResponse<CollegeDepartment>;
export type CollegeDepartmentsPaginatedResponse = ApiPaginatedResponse<CollegeDepartment>;