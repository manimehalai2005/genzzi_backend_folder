'use client';

import { collegeApi } from '@/lib/api/CollegeApi';
import { CollegeResponse, CollegesPaginatedResponse } from '@/response/College';
import { CreateCollegeDto, UpdateCollegeDto } from '@/typess/College';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Colleges Hook
export function useColleges() {
  return useQuery<CollegesPaginatedResponse>({
    queryKey: ['colleges'],
    queryFn: () => collegeApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single College Hook
export function useCollege(id: string) {
  return useQuery<CollegeResponse>({
    queryKey: ['colleges', id],
    queryFn: () => collegeApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create College Hook
export function useCreateCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCollegeDto) => collegeApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
    },
  });
}

// 4. Update College Hook
export function useUpdateCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCollegeDto }) =>
      collegeApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
      queryClient.invalidateQueries({ queryKey: ['colleges', variables.id] });
    },
  });
}

// 5. Delete College Hook
export function useDeleteCollege() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => collegeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
    },
  });
}