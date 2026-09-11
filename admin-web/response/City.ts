import { City } from "@/typess/City";

export interface CityResponse {
  success: boolean;
  message: string;
  data: City;
}

export interface CitiesPaginatedResponse {
  success: boolean;
  message: string;
  data: City[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
