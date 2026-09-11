import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CitiesPaginatedResponse, CityResponse } from "@/response/City";
import {  CreateCityDto, UpdateCityDto } from "@/typess/City";


export const cityApi = {
  // 1. Get All Cities
  async getAll(): Promise<CitiesPaginatedResponse> {
    const { data } = await axiosInstance.get<CitiesPaginatedResponse>('/cities');
    return data;
  },

  // 2. Get Single City by ID
  async getById(id: string): Promise<CityResponse> {
    const { data } = await axiosInstance.get<CityResponse>(`/cities/${id}`);
    return data;
  },

  // 3. Create New City
  async create(dto: CreateCityDto): Promise<CityResponse> {
    const { data } = await axiosInstance.post<CityResponse>('/cities', dto);
    return data;
  },

  // 4. Update City by ID
  async update(id: string, dto: UpdateCityDto): Promise<CityResponse> {
    const { data } = await axiosInstance.put<CityResponse>(`/cities/${id}`, dto);
    return data;
  },

  // 5. Delete City by ID
  async remove(id: string): Promise<CityResponse> {
    const { data } = await axiosInstance.delete<CityResponse>(`/cities/${id}`);
    return data;
  },
};