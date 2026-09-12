import { University } from "@/typess/University";

export interface UniversityResponse {
  success: boolean;
  message: string;
  data: University;
}

export interface UniversitiesPaginatedResponse {
  success: boolean;
  message: string;
  data: University[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}