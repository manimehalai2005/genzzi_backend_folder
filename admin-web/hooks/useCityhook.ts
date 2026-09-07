'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  cityApi,
  CreateCityDto,
  UpdateCityDto,
  CityResponse,
  CitiesPaginatedResponse,
} from '@/app/api/CityApi'; 

// Global Query Keys for Cache Management
export const cityKeys = {
  all: ['cities'] as const,
  lists: () => [...cityKeys.all, 'list'] as const,
  details: () => [...cityKeys.all, 'detail'] as const,
  detail: (id: string) => [...cityKeys.details(), id] as const,
};

// 1. Fetch All Cities Hook
export function useCities() {
  return useQuery<CitiesPaginatedResponse>({
    queryKey: cityKeys.lists(),
    queryFn: () => cityApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single City Hook
export function useCity(id: string) {
  return useQuery<CityResponse>({
    queryKey: cityKeys.detail(id),
    queryFn: () => cityApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. City Mutations (Create, Update, Delete)
export function useCityMutations() {
  const queryClient = useQueryClient();

  // Create City
  const createMutation = useMutation({
    mutationFn: (dto: CreateCityDto) => cityApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
    },
  });

  // Update City
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCityDto }) =>
      cityApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: cityKeys.detail(variables.id),
      });
    },
  });

  // Delete City
  const deleteMutation = useMutation({
    mutationFn: (id: string) => cityApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
    },
  });

  return {
    createCity: createMutation.mutateAsync,
    updateCity: updateMutation.mutateAsync,
    deleteCity: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}