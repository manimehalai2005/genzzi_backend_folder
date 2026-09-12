import { CreateCollegeDto, UpdateCollegeDto } from "@/dto/College";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { CollegeResponse, CollegesPaginatedResponse } from "@/response/College";


export const collegeApi = {
  // 1. Get All Colleges
  async getAll(): Promise<CollegesPaginatedResponse> {
    const { data } = await axiosInstance.get<CollegesPaginatedResponse>('/colleges');
    return data;
  },

  // 2. Get Single College by ID
  async getById(id: string): Promise<CollegeResponse> {
    const { data } = await axiosInstance.get<CollegeResponse>(`/colleges/${id}`);
    return data;
  },

  // 3. Create New College
  async create(dto: CreateCollegeDto): Promise<CollegeResponse> {
    const { data } = await axiosInstance.post<CollegeResponse>('/colleges', dto);
    return data;
  },

  // 4. Update College by ID
  async update(id: string, dto: UpdateCollegeDto): Promise<CollegeResponse> {
    const { data } = await axiosInstance.put<CollegeResponse>(`/colleges/${id}`, dto);
    return data;
  },

  // 5. Delete College by ID
  async remove(id: string): Promise<CollegeResponse> {
    const { data } = await axiosInstance.delete<CollegeResponse>(`/colleges/${id}`);
    return data;
  },
};