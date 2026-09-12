import { CreateLanguageDto, UpdateLanguageDto } from "@/dto/language";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import {
  LanguageResponse,
  LanguagesPaginatedResponse,
} from "@/response/Language";
import {
 
} from "@/typess/language";

export const languageApi = {


  async getAll(page: number = 1, limit: number = 10): Promise<LanguagesPaginatedResponse> {
    const { data } =
      await axiosInstance.get<LanguagesPaginatedResponse>(
        `/languages?page=${page}&limit=${limit}`
      );

    return data;
  },

 
  async getByCode(id: string): Promise<LanguageResponse> {
  const { data } = await axiosInstance.get<LanguageResponse>(
    `/languages/${id}`,
  );

  return data;
},


  async create(dto: CreateLanguageDto): Promise<LanguageResponse> {
    const { data } =
      await axiosInstance.post<LanguageResponse>(
        "/languages",
        dto
      );

    return data;
  },

 
  async update(
    id: string,
    dto: UpdateLanguageDto
  ): Promise<LanguageResponse> {
    const { data } =
      await axiosInstance.put<LanguageResponse>(
        `/languages/${id}`,
        dto
      );

    return data;
  },

 
  async remove(id: string): Promise<LanguageResponse> {
    const { data } =
      await axiosInstance.delete<LanguageResponse>(
        `/languages/${id}`
      );

    return data;
  },
};