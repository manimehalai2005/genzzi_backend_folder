'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  collegeDepartmentApi,
  CreateCollegeDepartmentDto,
  UpdateCollegeDepartmentDto,
  CollegeDepartmentResponse,
  CollegeDepartmentsPaginatedResponse,
} from '@/app/api/CollegeDepartmentApi'; // உங்கள் API கோப்பு பாதையை சரிபார்க்கவும்

// Cache Management-க்கான Global Query Keys
export const collegeDepartmentKeys = {
  all: ['college-departments'] as const,
  lists: () => [...collegeDepartmentKeys.all, 'list'] as const,
  details: () => [...collegeDepartmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...collegeDepartmentKeys.details(), id] as const,
};

// 1. Fetch All College Departments Hook
export function useCollegeDepartments() {
  return useQuery<CollegeDepartmentsPaginatedResponse>({
    queryKey: collegeDepartmentKeys.lists(),
    queryFn: () => collegeDepartmentApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single College Department Hook
export function useCollegeDepartment(id: string) {
  return useQuery<CollegeDepartmentResponse>({
    queryKey: collegeDepartmentKeys.detail(id),
    queryFn: () => collegeDepartmentApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. College Department Mutations (Create, Update, Delete)
export function useCollegeDepartmentMutations() {
  const queryClient = useQueryClient();

  // Create College Department
  const createMutation = useMutation({
    mutationFn: (dto: CreateCollegeDepartmentDto) =>
      collegeDepartmentApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: collegeDepartmentKeys.lists() });
    },
  });

  // Update College Department
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCollegeDepartmentDto }) =>
      collegeDepartmentApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: collegeDepartmentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: collegeDepartmentKeys.detail(variables.id),
      });
    },
  });

  // Delete College Department
  const deleteMutation = useMutation({
    mutationFn: (id: string) => collegeDepartmentApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: collegeDepartmentKeys.lists() });
    },
  });

  return {
    createCollegeDepartment: createMutation.mutateAsync,
    updateCollegeDepartment: updateMutation.mutateAsync,
    deleteCollegeDepartment: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}