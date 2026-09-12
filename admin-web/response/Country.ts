import { Country } from "@/typess/Country";

export interface CountryResponse {
  success: boolean;
  message: string;
  data: Country;
}

export interface CountriesPaginatedResponse {
  success: boolean;
  message: string;
  data: Country[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}