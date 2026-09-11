import { College } from "@/typess/College";

export interface CollegeResponse {
  success: boolean;
  message: string;
  data: College;
}

export interface CollegesPaginatedResponse {
  success: boolean;
  message: string;
  data: College[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}