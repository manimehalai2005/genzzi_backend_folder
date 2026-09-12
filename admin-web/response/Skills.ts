import { Skill } from "@/typess/Skill";

export interface SkillResponse {
  success: boolean;
  message: string;
  data: Skill;
}

export interface SkillsPaginatedResponse {
  success: boolean;
  message: string;
  data: Skill[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}