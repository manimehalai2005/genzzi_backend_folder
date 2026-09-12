import { CreateDepartmentDto, UpdateDepartmentDto } from "@/dto/department";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { DepartmentResponse, DepartmentsPaginatedResponse } from "@/response/Department";


export const departmentApi = {
  // 1. Get All Departments
  async getAll(): Promise<DepartmentsPaginatedResponse> {
    const { data } = await axiosInstance.get<DepartmentsPaginatedResponse>('/departments');
    return data;
  },

  // 2. Get Single Department by ID
  async getById(id: string): Promise<DepartmentResponse> {
    const { data } = await axiosInstance.get<DepartmentResponse>(`/departments/${id}`);
    return data;
  },

  // 3. Create New Department
  async create(dto: CreateDepartmentDto): Promise<DepartmentResponse> {
    const { data } = await axiosInstance.post<DepartmentResponse>('/departments', dto);
    return data;
  },

  // 4. Update Department by ID
  async update(id: string, dto: UpdateDepartmentDto): Promise<DepartmentResponse> {
    const { data } = await axiosInstance.put<DepartmentResponse>(`/departments/${id}`, dto);
    return data;
  },

  // 5. Delete Department by ID
  async remove(id: string): Promise<DepartmentResponse> {
    const { data } = await axiosInstance.delete<DepartmentResponse>(`/departments/${id}`);
    return data;
  },
};