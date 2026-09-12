import { CollegeDepartment } from "@/typess/CollegeDepartment";

export interface CollegeDepartmentResponse {
  success: boolean;
  message: string;
  data: CollegeDepartment;
}

export interface CollegeDepartmentsPaginatedResponse {
  success: boolean;
  message: string;
  data: CollegeDepartment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
