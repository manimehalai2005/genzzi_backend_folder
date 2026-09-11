'use client';

import { CreateIndustryDto, UpdateIndustryDto } from '@/dto/Industry';
import { industryApi } from '@/lib/api/IndustriesApi';
import { IndustriesPaginatedResponse, IndustryResponse } from '@/response/Industries';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Industries Hook
export function useIndustries() {
  return useQuery<IndustriesPaginatedResponse>({
    queryKey: ['industries'],
    queryFn: () => industryApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Industry Hook
export function useIndustry(id: string) {
  return useQuery<IndustryResponse>({
    queryKey: ['industries', id],
    queryFn: () => industryApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create Industry Hook
export function useCreateIndustry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateIndustryDto) => industryApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industries'] });
    },
  });
}

// 4. Update Industry Hook
export function useUpdateIndustry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateIndustryDto }) =>
      industryApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['industries'] });
      queryClient.invalidateQueries({ queryKey: ['industries', variables.id] });
    },
  });
}

// 5. Delete Industry Hook
export function useDeleteIndustry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => industryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industries'] });
    },
  });
}