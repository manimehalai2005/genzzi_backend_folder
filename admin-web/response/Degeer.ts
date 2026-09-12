import { Degree } from "@/typess/degree";

export interface DegreeResponse {
  success: boolean;
  message: string;
  data: Degree;
}

export interface DegreesPaginatedResponse {
  success: boolean;
  message: string;
  data: Degree[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}