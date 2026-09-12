import { SocialPlatform } from '@/typess/Socialplatform';

export interface SocialPlatformEditDialogProps {
  platform: SocialPlatform | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}