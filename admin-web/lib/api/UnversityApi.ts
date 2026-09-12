
import { CreateUniversityDto, UpdateUniversityDto } from "@/dto/University";
import { axiosInstance } from "../axios/axiosInstance";
import { UniversitiesPaginatedResponse, UniversityResponse } from "@/response/University";


export const universityApi = {
  // 1. Get All Universities
  async getAll(page = 1, limit = 10): Promise<UniversitiesPaginatedResponse> {
    const { data } = await axiosInstance.get<UniversitiesPaginatedResponse>('/universities', {
      params: { page, limit },
    });
    return data;
  },

  // 2. Get Single University by ID
  async getById(id: string): Promise<UniversityResponse> {
    const { data } = await axiosInstance.get<UniversityResponse>(`/universities/${id}`);
    return data;
  },

  // 3. Create New University
  async create(dto: CreateUniversityDto): Promise<UniversityResponse> {
    const { data } = await axiosInstance.post<UniversityResponse>('/universities', dto);
    return data;
  },

  // 4. Update University by ID
  async update(id: string, dto: UpdateUniversityDto): Promise<UniversityResponse> {
    const { data } = await axiosInstance.put<UniversityResponse>(`/universities/${id}`, dto);
    return data;
  },

  // 5. Delete University by ID
  async remove(id: string): Promise<UniversityResponse> {
    const { data } = await axiosInstance.delete<UniversityResponse>(`/universities/${id}`);
    return data;
  },
};