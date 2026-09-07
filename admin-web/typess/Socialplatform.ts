
import { SocialPlatform } from '@/app/api/SocialPlatformApi';
export interface SocialPlatformEditDialogProps {
  platform: SocialPlatform | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface SocialPlatformTableProps {
  platforms: SocialPlatform[];
}