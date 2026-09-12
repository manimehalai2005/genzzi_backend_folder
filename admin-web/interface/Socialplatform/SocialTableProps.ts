import { SocialPlatform } from "@/typess/Socialplatform";

export interface SocialPlatformTableProps {
  data: SocialPlatform[];
  isLoading?: boolean;
  onEdit?: (platform: SocialPlatform) => void;
  onDelete?: (id: string) => void;
}