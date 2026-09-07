'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  collegeApi,
  CreateCollegeDto,
  UpdateCollegeDto,
  CollegeResponse,
  CollegesPaginatedResponse,
} from '@/app/api/CollegeApi'; 

// Cache Management-க்கான Global Query Keys
export const collegeKeys = {
  all: ['colleges'] as const,
  lists: () => [...collegeKeys.all, 'list'] as const,
  details: () => [...collegeKeys.all, 'detail'] as const,
  detail: (id: string) => [...collegeKeys.details(), id] as const,
};

// 1. Fetch All Colleges Hook
export function useColleges() {
  return useQuery<CollegesPaginatedResponse>({
    queryKey: collegeKeys.lists(),
    queryFn: () => collegeApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single College Hook
export function useCollege(id: string) {
  return useQuery<CollegeResponse>({
    queryKey: collegeKeys.detail(id),
    queryFn: () => collegeApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. College Mutations (Create, Update, Delete)
export function useCollegeMutations() {
  const queryClient = useQueryClient();

  // Create College
  const createMutation = useMutation({
    mutationFn: (dto: CreateCollegeDto) => collegeApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: collegeKeys.lists() });
    },
  });

  // Update College
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCollegeDto }) =>
      collegeApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: collegeKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: collegeKeys.detail(variables.id),
      });
    },
  });

  // Delete College
  const deleteMutation = useMutation({
    mutationFn: (id: string) => collegeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: collegeKeys.lists() });
    },
  });

  return {
    createCollege: createMutation.mutateAsync,
    updateCollege: updateMutation.mutateAsync,
    deleteCollege: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}