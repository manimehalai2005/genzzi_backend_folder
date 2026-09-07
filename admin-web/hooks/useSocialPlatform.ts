'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  socialPlatformApi,
  CreateSocialPlatformDto,
  UpdateSocialPlatformDto,
  SocialPlatformResponse,
  SocialPlatformsPaginatedResponse,
} from '@/app/api/SocialPlatformApi'; // உங்கள் API கோப்பு பாதையை சரிபார்க்கவும்

// Cache Management-க்கான Global Query Keys
export const socialPlatformKeys = {
  all: ['social-platforms'] as const,
  lists: () => [...socialPlatformKeys.all, 'list'] as const,
  details: () => [...socialPlatformKeys.all, 'detail'] as const,
  detail: (id: string) => [...socialPlatformKeys.details(), id] as const,
};

// 1. Fetch All Social Platforms Hook
export function useSocialPlatforms() {
  return useQuery<SocialPlatformsPaginatedResponse>({
    queryKey: socialPlatformKeys.lists(),
    queryFn: () => socialPlatformApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Social Platform Hook
export function useSocialPlatform(id: string) {
  return useQuery<SocialPlatformResponse>({
    queryKey: socialPlatformKeys.detail(id),
    queryFn: () => socialPlatformApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. Social Platform Mutations (Create, Update, Delete)
export function useSocialPlatformMutations() {
  const queryClient = useQueryClient();

  // Create Social Platform
  const createMutation = useMutation({
    mutationFn: (dto: CreateSocialPlatformDto) => socialPlatformApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: socialPlatformKeys.lists() });
    },
  });

  // Update Social Platform
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateSocialPlatformDto }) =>
      socialPlatformApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: socialPlatformKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: socialPlatformKeys.detail(variables.id),
      });
    },
  });

  // Delete Social Platform
  const deleteMutation = useMutation({
    mutationFn: (id: string) => socialPlatformApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: socialPlatformKeys.lists() });
    },
  });

  return {
    createSocialPlatform: createMutation.mutateAsync,
    updateSocialPlatform: updateMutation.mutateAsync,
    deleteSocialPlatform: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}