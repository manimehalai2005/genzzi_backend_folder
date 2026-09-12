import { CreateCollegeDepartmentDto, UpdateCollegeDepartmentDto } from "@/dto/CollegeDepartment";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CollegeDepartmentResponse, CollegeDepartmentsPaginatedResponse } from "@/response/CollegeDepartment";



export const collegeDepartmentApi = {
  // 1. Get All College Departments
  async getAll(): Promise<CollegeDepartmentsPaginatedResponse> {
    const { data } = await axiosInstance.get<CollegeDepartmentsPaginatedResponse>('/college-departments');
    return data;
  },

  // 2. Get Single College Department by ID
  async getById(id: string): Promise<CollegeDepartmentResponse> {
    const { data } = await axiosInstance.get<CollegeDepartmentResponse>(`/college-departments/${id}`);
    return data;
  },

  // 3. Create New College Department
  async create(dto: CreateCollegeDepartmentDto): Promise<CollegeDepartmentResponse> {
    const { data } = await axiosInstance.post<CollegeDepartmentResponse>('/college-departments', dto);
    return data;
  },

  // 4. Update College Department by ID
  async update(id: string, dto: UpdateCollegeDepartmentDto): Promise<CollegeDepartmentResponse> {
    const { data } = await axiosInstance.put<CollegeDepartmentResponse>(`/college-departments/${id}`, dto);
    return data;
  },

  // 5. Delete College Department by ID
  async remove(id: string): Promise<CollegeDepartmentResponse> {
    const { data } = await axiosInstance.delete<CollegeDepartmentResponse>(`/college-departments/${id}`);
    return data;
  },
};