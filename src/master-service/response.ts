import type {
  CertificationProvider,
  City,
  College,
  CollegeDepartment,
  Country,
  Currency,
  Degree,
  Department,
  FileType,
  Industry,
  Language,
  Skill,
  SocialPlatform,
  State,
  Timezone,
  University,
} from './types';

import type { University as PrismaUniversity } from '../generated/client';

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

// Country
export type CountryResponse = ApiResponse<Country>;
export type CountriesPaginatedResponse =
  ApiPaginatedResponse<Country>;

// State
export type StateResponse = ApiResponse<State>;
export type StatesPaginatedResponse =
  ApiPaginatedResponse<State>;

// City
export type CityResponse = ApiResponse<City>;
export type CitiesPaginatedResponse =
  ApiPaginatedResponse<City>;

// Language
export type LanguageResponse = ApiResponse<Language>;
export type LanguagesPaginatedResponse =
  ApiPaginatedResponse<Language>;

// Currency
export type CurrencyResponse = ApiResponse<Currency>;
export type CurrenciesPaginatedResponse =
  ApiPaginatedResponse<Currency>;

// Timezone
export type TimezoneResponse = ApiResponse<Timezone>;
export type TimezonesPaginatedResponse =
  ApiPaginatedResponse<Timezone>;

// Skill
export type SkillResponse = ApiResponse<Skill>;
export type SkillsPaginatedResponse =
  ApiPaginatedResponse<Skill>;

// Industry
export type IndustryResponse = ApiResponse<Industry>;
export type IndustriesPaginatedResponse =
  ApiPaginatedResponse<Industry>;

// Degree
export type DegreeResponse = ApiResponse<Degree>;
export type DegreesPaginatedResponse =
  ApiPaginatedResponse<Degree>;

// University
// Prisma generated type is used here because
// UniversityService returns Prisma University data.
export type UniversityResponse =
  ApiResponse<PrismaUniversity>;

export type UniversitiesPaginatedResponse =
  ApiPaginatedResponse<PrismaUniversity>;

// Certification Provider
export type CertificationProviderResponse =
  ApiResponse<CertificationProvider>;

export type CertificationProvidersPaginatedResponse =
  ApiPaginatedResponse<CertificationProvider>;

// File Type
export type FileTypeResponse =
  ApiResponse<FileType>;

export type FileTypesPaginatedResponse =
  ApiPaginatedResponse<FileType>;

// Social Platform
export type SocialPlatformResponse =
  ApiResponse<SocialPlatform>;

export type SocialPlatformsPaginatedResponse =
  ApiPaginatedResponse<SocialPlatform>;

// College
export type CollegeResponse =
  ApiResponse<College>;

export type CollegesPaginatedResponse =
  ApiPaginatedResponse<College>;

// Department
export type DepartmentResponse =
  ApiResponse<Department>;

export type DepartmentsPaginatedResponse =
  ApiPaginatedResponse<Department>;

// College Department
export type CollegeDepartmentResponse =
  ApiResponse<CollegeDepartment>;

export type CollegeDepartmentsPaginatedResponse =
  ApiPaginatedResponse<CollegeDepartment>;