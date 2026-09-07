'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  degreeApi,
  CreateDegreeDto,
  UpdateDegreeDto,
  DegreeResponse,
  DegreesPaginatedResponse,
} from '@/app/api/DegreeApi'; 

// Cache Management-க்கான Global Query Keys
export const degreeKeys = {
  all: ['degrees'] as const,
  lists: () => [...degreeKeys.all, 'list'] as const,
  details: () => [...degreeKeys.all, 'detail'] as const,
  detail: (id: string) => [...degreeKeys.details(), id] as const,
};

// 1. Fetch All Degrees Hook
export function useDegrees() {
  return useQuery<DegreesPaginatedResponse>({
    queryKey: degreeKeys.lists(),
    queryFn: () => degreeApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Degree Hook
export function useDegree(id: string) {
  return useQuery<DegreeResponse>({
    queryKey: degreeKeys.detail(id),
    queryFn: () => degreeApi.getById(id),
    enabled: !!id, 
  });
}

// 3. Degree Mutations (Create, Update, Delete)
export function useDegreeMutations() {
  const queryClient = useQueryClient();

  // Create Degree
  const createMutation = useMutation({
    mutationFn: (dto: CreateDegreeDto) => degreeApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: degreeKeys.lists() });
    },
  });

  // Update Degree
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateDegreeDto }) =>
      degreeApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: degreeKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: degreeKeys.detail(variables.id),
      });
    },
  });

  // Delete Degree
  const deleteMutation = useMutation({
    mutationFn: (id: string) => degreeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: degreeKeys.lists() });
    },
  });

  return {
    createDegree: createMutation.mutateAsync,
    updateDegree: updateMutation.mutateAsync,
    deleteDegree: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}