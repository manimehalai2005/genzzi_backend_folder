import { CreateSkillDto, UpdateSkillDto } from "@/dto/Skill";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { SkillResponse, SkillsPaginatedResponse } from "@/response/Skills";



export const skillApi = {
  // 1. Get All Skills
  async getAll(): Promise<SkillsPaginatedResponse> {
    const { data } = await axiosInstance.get<SkillsPaginatedResponse>('/skills');
    return data;
  },

  // 2. Get Single Skill by ID
  async getById(id: string): Promise<SkillResponse> {
    const { data } = await axiosInstance.get<SkillResponse>(`/skills/${id}`);
    return data;
  },

  // 3. Create New Skill
  async create(dto: CreateSkillDto): Promise<SkillResponse> {
    const { data } = await axiosInstance.post<SkillResponse>('/skills', dto);
    return data;
  },

  // 4. Update Skill by ID
  async update(id: string, dto: UpdateSkillDto): Promise<SkillResponse> {
    const { data } = await axiosInstance.put<SkillResponse>(`/skills/${id}`, dto);
    return data;
  },

  // 5. Delete Skill by ID
  async remove(id: string): Promise<SkillResponse> {
    const { data } = await axiosInstance.delete<SkillResponse>(`/skills/${id}`);
    return data;
  },
};