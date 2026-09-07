'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  universityApi,
  CreateUniversityDto,
  UpdateUniversityDto,
  UniversityResponse,
  UniversitiesPaginatedResponse,
} from '@/app/api/UnversityApi'; 

// Cache Management-க்கான Global Query Keys
export const universityKeys = {
  all: ['universities'] as const,
  lists: () => [...universityKeys.all, 'list'] as const,
  details: () => [...universityKeys.all, 'detail'] as const,
  detail: (id: string) => [...universityKeys.details(), id] as const,
};

// 1. Fetch All Universities Hook
export function useUniversities() {
  return useQuery<UniversitiesPaginatedResponse>({
    queryKey: universityKeys.lists(),
    queryFn: () => universityApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single University Hook
export function useUniversity(id: string) {
  return useQuery<UniversityResponse>({
    queryKey: universityKeys.detail(id),
    queryFn: () => universityApi.getById(id),
    enabled: !!id,
  });
}

// 3. University Mutations (Create, Update, Delete)
export function useUniversityMutations() {
  const queryClient = useQueryClient();

  // Create University
  const createMutation = useMutation({
    mutationFn: (dto: CreateUniversityDto) => universityApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: universityKeys.lists() });
    },
  });

  // Update University
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUniversityDto }) =>
      universityApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: universityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: universityKeys.detail(variables.id),
      });
    },
  });

  // Delete University
  const deleteMutation = useMutation({
    mutationFn: (id: string) => universityApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: universityKeys.lists() });
    },
  });

  return {
    createUniversity: createMutation.mutateAsync,
    updateUniversity: updateMutation.mutateAsync,
    deleteUniversity: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}