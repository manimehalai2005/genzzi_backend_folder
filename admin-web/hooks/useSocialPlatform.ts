'use client';

import { socialPlatformApi } from '@/lib/api/SocialPlatformApi';
import { SocialPlatformResponse, SocialPlatformsPaginatedResponse } from '@/response/Socialplatform';
import { 
  CreateSocialPlatformDto, 
  UpdateSocialPlatformDto 
} from '@/typess/Socialplatform';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Social Platforms Hook (with Pagination)
export function useSocialPlatforms(page = 1, limit = 100) {
  return useQuery<SocialPlatformsPaginatedResponse>({
    queryKey: ['social-platforms', page, limit],
    queryFn: () => socialPlatformApi.getAll(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Social Platform Hook
export function useSocialPlatform(id: string) {
  return useQuery<SocialPlatformResponse>({
    queryKey: ['social-platforms', id],
    queryFn: () => socialPlatformApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create Social Platform Hook
export function useCreateSocialPlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateSocialPlatformDto) => socialPlatformApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-platforms'] });
    },
  });
}

// 4. Update Social Platform Hook
export function useUpdateSocialPlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateSocialPlatformDto }) =>
      socialPlatformApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['social-platforms'] });
      queryClient.invalidateQueries({ queryKey: ['social-platforms', variables.id] });
    },
  });
}

// 5. Delete Social Platform Hook
export function useDeleteSocialPlatform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => socialPlatformApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-platforms'] });
    },
  });
}