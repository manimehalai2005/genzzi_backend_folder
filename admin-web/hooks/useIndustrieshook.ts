'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  industryApi,
  CreateIndustryDto,
  UpdateIndustryDto,
  IndustryResponse,
  IndustriesPaginatedResponse,
} from '@/app/api/IndustriesApi'; // உங்கள் API கோப்பு பாதையை சரிபார்க்கவும்

// Cache Management-க்கான Global Query Keys
export const industryKeys = {
  all: ['industries'] as const,
  lists: () => [...industryKeys.all, 'list'] as const,
  details: () => [...industryKeys.all, 'detail'] as const,
  detail: (id: string) => [...industryKeys.details(), id] as const,
};

// 1. Fetch All Industries Hook
export function useIndustries() {
  return useQuery<IndustriesPaginatedResponse>({
    queryKey: industryKeys.lists(),
    queryFn: () => industryApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Industry Hook
export function useIndustry(id: string) {
  return useQuery<IndustryResponse>({
    queryKey: industryKeys.detail(id),
    queryFn: () => industryApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. Industry Mutations (Create, Update, Delete)
export function useIndustryMutations() {
  const queryClient = useQueryClient();

  // Create Industry
  const createMutation = useMutation({
    mutationFn: (dto: CreateIndustryDto) => industryApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industryKeys.lists() });
    },
  });

  // Update Industry
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateIndustryDto }) =>
      industryApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: industryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: industryKeys.detail(variables.id),
      });
    },
  });

  // Delete Industry
  const deleteMutation = useMutation({
    mutationFn: (id: string) => industryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industryKeys.lists() });
    },
  });

  return {
    createIndustry: createMutation.mutateAsync,
    updateIndustry: updateMutation.mutateAsync,
    deleteIndustry: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}