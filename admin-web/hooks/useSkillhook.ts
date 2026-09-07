'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  skillApi,
  CreateSkillDto,
  UpdateSkillDto,
  SkillResponse,
  SkillsPaginatedResponse,
} from '@/app/api/SkillApi'; // உங்கள் API கோப்பு பாதையை சரிபார்க்கவும்

// Cache Management-க்கான Global Query Keys
export const skillKeys = {
  all: ['skills'] as const,
  lists: () => [...skillKeys.all, 'list'] as const,
  details: () => [...skillKeys.all, 'detail'] as const,
  detail: (id: string) => [...skillKeys.details(), id] as const,
};

// 1. Fetch All Skills Hook
export function useSkills() {
  return useQuery<SkillsPaginatedResponse>({
    queryKey: skillKeys.lists(),
    queryFn: () => skillApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Skill Hook
export function useSkill(id: string) {
  return useQuery<SkillResponse>({
    queryKey: skillKeys.detail(id),
    queryFn: () => skillApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. Skill Mutations (Create, Update, Delete)
export function useSkillMutations() {
  const queryClient = useQueryClient();

  // Create Skill
  const createMutation = useMutation({
    mutationFn: (dto: CreateSkillDto) => skillApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillKeys.lists() });
    },
  });

  // Update Skill
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateSkillDto }) =>
      skillApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: skillKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: skillKeys.detail(variables.id),
      });
    },
  });

  // Delete Skill
  const deleteMutation = useMutation({
    mutationFn: (id: string) => skillApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillKeys.lists() });
    },
  });

  return {
    createSkill: createMutation.mutateAsync,
    updateSkill: updateMutation.mutateAsync,
    deleteSkill: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}