import { Department } from "@/typess/Department";

export interface DepartmentResponse {
  success: boolean;
  message: string;
  data: Department;
}

export interface DepartmentsPaginatedResponse {
  success: boolean;
  message: string;
  data: Department[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}