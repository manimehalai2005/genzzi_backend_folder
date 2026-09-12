import { CreateIndustryDto, UpdateIndustryDto } from "@/dto/Industry";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { IndustriesPaginatedResponse, IndustryResponse } from "@/response/Industries";



export const industryApi = {
  // 1. Get All Industries
  async getAll(): Promise<IndustriesPaginatedResponse> {
    const { data } = await axiosInstance.get<IndustriesPaginatedResponse>('/industries');
    return data;
  },

  // 2. Get Single Industry by ID
  async getById(id: string): Promise<IndustryResponse> {
    const { data } = await axiosInstance.get<IndustryResponse>(`/industries/${id}`);
    return data;
  },

  // 3. Create New Industry
  async create(dto: CreateIndustryDto): Promise<IndustryResponse> {
    const { data } = await axiosInstance.post<IndustryResponse>('/industries', dto);
    return data;
  },

  // 4. Update Industry by ID
  async update(id: string, dto: UpdateIndustryDto): Promise<IndustryResponse> {
    const { data } = await axiosInstance.put<IndustryResponse>(`/industries/${id}`, dto);
    return data;
  },

  // 5. Delete Industry by ID
  async remove(id: string): Promise<IndustryResponse> {
    const { data } = await axiosInstance.delete<IndustryResponse>(`/industries/${id}`);
    return data;
  },
};