import { axiosInstance } from "@/lib/axios/axiosInstance";
import { StateResponse, StatesPaginatedResponse } from "@/response/State";
import { CreateStateDto,  UpdateStateDto } from "@/typess/State";

export const stateApi = {
  // 1. Get All States (with Pagination support)
  async getAll(page = 1, limit = 10): Promise<StatesPaginatedResponse> {
    const { data } = await axiosInstance.get<StatesPaginatedResponse>('/states', {
      params: { page, limit },
    });
    return data;
  },
 

  // 2. Get Single State by ID
  async getById(id: string): Promise<StateResponse> {
    const { data } = await axiosInstance.get<StateResponse>(`/states/${id}`);
    return data;
  },

  // 3. Create New State


  // 4. Update State by ID
  async update(id: string, dto: UpdateStateDto): Promise<StateResponse> {
    const { data } = await axiosInstance.patch<StateResponse>(`/states/${id}`, dto);
    return data;
  },

  // 5. Delete State by ID
  async remove(id: string): Promise<StateResponse> {
    const { data } = await axiosInstance.delete<StateResponse>(`/states/${id}`);
    return data;
  },
  async create(dto: CreateStateDto): Promise<StateResponse> {
  try {
    console.log("STATE CREATE DTO:", dto);

    const { data } = await axiosInstance.post<StateResponse>(
      "/states",
      dto
    );

    return data;
  } catch (error: any) {
    console.log("STATE CREATE ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    console.log("REQUEST DATA:", dto);

    throw error;
  }
}
};
