import { axiosInstance } from "@/lib/axios/axiosInstance";
import { TimezoneResponse, TimezonesPaginatedResponse } from "@/response/TimeZone";
import { CreateTimezoneDto, UpdateTimezoneDto } from "@/typess/TimeZone";

export const timezoneApi = {
  // 1. Get All Timezones
  async getAll(): Promise<TimezonesPaginatedResponse> {
    const { data } = await axiosInstance.get<TimezonesPaginatedResponse>('/timezones');
    return data;
  },

  // 2. Get Single Timezone by ID
  async getById(id: string): Promise<TimezoneResponse> {
    const { data } = await axiosInstance.get<TimezoneResponse>(`/timezones/${id}`);
    return data;
  },

  // 3. Create New Timezone
  async create(dto: CreateTimezoneDto): Promise<TimezoneResponse> {
    const { data } = await axiosInstance.post<TimezoneResponse>('/timezones', dto);
    return data;
  },

  // 4. Update Timezone by ID
  async update(id: string, dto: UpdateTimezoneDto): Promise<TimezoneResponse> {
    const { data } = await axiosInstance.put<TimezoneResponse>(`/timezones/${id}`, dto);
    return data;
  },

  // 5. Delete Timezone by ID
  async remove(id: string): Promise<TimezoneResponse> {
    const { data } = await axiosInstance.delete<TimezoneResponse>(`/timezones/${id}`);
    return data;
  },
};