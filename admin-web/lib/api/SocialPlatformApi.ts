import { CreateSocialPlatformDto, UpdateSocialPlatformDto } from "@/dto/Socialplatform";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { SocialPlatformResponse, SocialPlatformsPaginatedResponse } from "@/response/Socialplatform";



export const socialPlatformApi = {
  // 1. Get all social platforms
  async getAll(
    page = 1,
    limit = 100
  ): Promise<SocialPlatformsPaginatedResponse> {
    const { data } = await axiosInstance.get<SocialPlatformsPaginatedResponse>(
      '/social-platforms',
      {
        params: { page, limit },
      }
    );
    return data;
  },

  // 2. Get social platform by ID
  async getById(id: string): Promise<SocialPlatformResponse> {
    const { data } = await axiosInstance.get<SocialPlatformResponse>(
      `/social-platforms/${id}`
    );
    return data;
  },

  // 3. Create social platform
  async create(
    dto: CreateSocialPlatformDto
  ): Promise<SocialPlatformResponse> {
    const { data } = await axiosInstance.post<SocialPlatformResponse>(
      '/social-platforms',
      dto
    );
    return data;
  },

  // 4. Update social platform
  async update(
    id: string,
    dto: UpdateSocialPlatformDto
  ): Promise<SocialPlatformResponse> {
    const { data } = await axiosInstance.put<SocialPlatformResponse>(
      `/social-platforms/${id}`,
      dto
    );
    return data;
  },

  // 5. Delete social platform
  async remove(id: string): Promise<SocialPlatformResponse> {
    const { data } = await axiosInstance.delete<SocialPlatformResponse>(
      `/social-platforms/${id}`
    );
    return data;
  },
};