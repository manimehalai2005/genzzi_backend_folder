'use client';

import { departmentApi } from '@/lib/api/DepartmentApi';
import { DepartmentResponse, DepartmentsPaginatedResponse } from '@/response/Department';
import { 
  CreateDepartmentDto, 
  UpdateDepartmentDto 
} from '@/typess/Department';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Departments Hook
export function useDepartments() {
  return useQuery<DepartmentsPaginatedResponse>({
    queryKey: ['departments'],
    queryFn: () => departmentApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Department Hook
export function useDepartment(id: string) {
  return useQuery<DepartmentResponse>({
    queryKey: ['departments', id],
    queryFn: () => departmentApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create Department Hook
export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateDepartmentDto) => departmentApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
}

// 4. Update Department Hook
export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateDepartmentDto }) =>
      departmentApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      queryClient.invalidateQueries({ queryKey: ['departments', variables.id] });
    },
  });
}

// 5. Delete Department Hook
export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => departmentApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
}