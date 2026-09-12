export interface CreateSocialPlatformDto {
  name: string;
  website?: string;
  icon?: string;
}

export interface UpdateSocialPlatformDto {
  name?: string;
  website?: string;
  icon?: string;
}
