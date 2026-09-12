import { Industry } from "@/typess/Industries";

export interface IndustryResponse {
  success: boolean;
  message: string;
  data: Industry;
}

export interface IndustriesPaginatedResponse {
  success: boolean;
  message: string;
  data: Industry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}