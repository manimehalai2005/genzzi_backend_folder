'use client';

import { CreateCollegeDepartmentDto, UpdateCollegeDepartmentDto } from '@/dto/CollegeDepartment';
import { collegeDepartmentApi } from '@/lib/api/CollegeDepartmentApi';
import { CollegeDepartmentResponse, CollegeDepartmentsPaginatedResponse } from '@/response/CollegeDepartment';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All College Departments Hook
export function useCollegeDepartments() {
  return useQuery<CollegeDepartmentsPaginatedResponse>({
    queryKey: ['college-departments'],
    queryFn: () => collegeDepartmentApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single College Department Hook
export function useCollegeDepartment(id: string) {
  return useQuery<CollegeDepartmentResponse>({
    queryKey: ['college-departments', id],
    queryFn: () => collegeDepartmentApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create College Department Hook
export function useCreateCollegeDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCollegeDepartmentDto) => 
      collegeDepartmentApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-departments'] });
    },
  });
}

// 4. Update College Department Hook
export function useUpdateCollegeDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCollegeDepartmentDto }) => 
      collegeDepartmentApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-departments'] });
      queryClient.invalidateQueries({
        queryKey: ['college-departments', variables.id],
      });
    },
  });
}

// 5. Delete College Department Hook
export function useDeleteCollegeDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => collegeDepartmentApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-departments'] });
    },
  });
}