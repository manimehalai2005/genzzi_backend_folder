import { SocialPlatform } from "@/typess/Socialplatform";

export interface SocialPlatformResponse {
  success: boolean;
  message: string;
  data: SocialPlatform;
}

export interface SocialPlatformsPaginatedResponse {
  success: boolean;
  message: string;
  data: SocialPlatform[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}