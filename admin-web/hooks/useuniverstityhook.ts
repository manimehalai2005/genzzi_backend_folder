'use client';

import { universityApi } from '@/lib/api/UnversityApi';
import { UniversitiesPaginatedResponse, UniversityResponse } from '@/response/University';
import { 
  CreateUniversityDto, 
  UpdateUniversityDto 
} from '@/typess/University';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Universities Hook (with Pagination)
export function useUniversities(page = 1, limit = 10) {
  return useQuery<UniversitiesPaginatedResponse>({
    queryKey: ['universities', page, limit],
    queryFn: () => universityApi.getAll(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single University Hook
export function useUniversity(id: string) {
  return useQuery<UniversityResponse>({
    queryKey: ['universities', id],
    queryFn: () => universityApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create University Hook
export function useCreateUniversity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateUniversityDto) => universityApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
    },
  });
}

// 4. Update University Hook
export function useUpdateUniversity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUniversityDto }) =>
      universityApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
      queryClient.invalidateQueries({ queryKey: ['universities', variables.id] });
    },
  });
}

// 5. Delete University Hook
export function useDeleteUniversity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => universityApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] });
    },
  });
}