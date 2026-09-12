import { CreateDegreeDto, UpdateDegreeDto } from "@/dto/degree";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { DegreeResponse, DegreesPaginatedResponse } from "@/response/Degeer";



export const degreeApi = {
  // 1. Get All Degrees
  async getAll(): Promise<DegreesPaginatedResponse> {
    const { data } = await axiosInstance.get<DegreesPaginatedResponse>('/degrees');
    return data;
  },

  // 2. Get Single Degree by ID
  async getById(id: string): Promise<DegreeResponse> {
    const { data } = await axiosInstance.get<DegreeResponse>(`/degrees/${id}`);
    return data;
  },

  // 3. Create New Degree
  async create(dto: CreateDegreeDto): Promise<DegreeResponse> {
    const { data } = await axiosInstance.post<DegreeResponse>('/degrees', dto);
    return data;
  },

  // 4. Update Degree by ID
  async update(id: string, dto: UpdateDegreeDto): Promise<DegreeResponse> {
    const { data } = await axiosInstance.put<DegreeResponse>(`/degrees/${id}`, dto);
    return data;
  },

  // 5. Delete Degree by ID
  async remove(id: string): Promise<DegreeResponse> {
    const { data } = await axiosInstance.delete<DegreeResponse>(`/degrees/${id}`);
    return data;
  },
};