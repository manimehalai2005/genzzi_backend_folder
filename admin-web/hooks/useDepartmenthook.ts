'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  departmentApi,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  DepartmentResponse,
  DepartmentsPaginatedResponse,
} from '@/app/api/DepartmentApi'; 

// Cache Management-க்கான Global Query Keys
export const departmentKeys = {
  all: ['departments'] as const,
  lists: () => [...departmentKeys.all, 'list'] as const,
  details: () => [...departmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...departmentKeys.details(), id] as const,
};

// 1. Fetch All Departments Hook
export function useDepartments() {
  return useQuery<DepartmentsPaginatedResponse>({
    queryKey: departmentKeys.lists(),
    queryFn: () => departmentApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Department Hook
export function useDepartment(id: string) {
  return useQuery<DepartmentResponse>({
    queryKey: departmentKeys.detail(id),
    queryFn: () => departmentApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. Department Mutations (Create, Update, Delete)
export function useDepartmentMutations() {
  const queryClient = useQueryClient();

  // Create Department
  const createMutation = useMutation({
    mutationFn: (dto: CreateDepartmentDto) => departmentApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });

  // Update Department
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateDepartmentDto }) =>
      departmentApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: departmentKeys.detail(variables.id),
      });
    },
  });

  // Delete Department
  const deleteMutation = useMutation({
    mutationFn: (id: string) => departmentApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });

  return {
    createDepartment: createMutation.mutateAsync,
    updateDepartment: updateMutation.mutateAsync,
    deleteDepartment: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}