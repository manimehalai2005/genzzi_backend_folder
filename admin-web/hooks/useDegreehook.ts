'use client';

import { degreeApi } from '@/lib/api/DegreeApi';
import { DegreeResponse, DegreesPaginatedResponse } from '@/response/Degeer';
import { 
  CreateDegreeDto, 
  UpdateDegreeDto 
} from '@/typess/degree';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Degrees Hook
export function useDegrees() {
  return useQuery<DegreesPaginatedResponse>({
    queryKey: ['degrees'],
    queryFn: () => degreeApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Degree Hook
export function useDegree(id: string) {
  return useQuery<DegreeResponse>({
    queryKey: ['degrees', id],
    queryFn: () => degreeApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

export function useCreateDegree() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateDegreeDto) => degreeApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['degrees'] });
    },
  });
}

// 4. Update Degree Hook
export function useUpdateDegree() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateDegreeDto }) =>
      degreeApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['degrees'] });
      queryClient.invalidateQueries({ queryKey: ['degrees', variables.id] });
    },
  });
}

// 5. Delete Degree Hook
export function useDeleteDegree() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => degreeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['degrees'] });
    },
  });
}