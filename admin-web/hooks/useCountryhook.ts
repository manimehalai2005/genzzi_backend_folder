'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  countryApi,
  Country,
  CreateCountryDto,
  UpdateCountryDto,
} from '@/app/api/CountryApi'; 

export interface CountryResponse {
  success: boolean;
  message: string;
  data: Country;
}

export interface CountriesPaginatedResponse {
  success: boolean;
  message: string;
  data: Country[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Global Query Keys for Cache Management
export const countryKeys = {
  all: ['countries'] as const,
  lists: () => [...countryKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...countryKeys.lists(), { page, limit }] as const,
  details: () => [...countryKeys.all, 'detail'] as const,
  detail: (id: string) => [...countryKeys.details(), id] as const,
};

// 1. Fetch All Countries Hook (Paginated)
export function useCountries(page = 1, limit = 10) {
  return useQuery<CountriesPaginatedResponse>({
    queryKey: countryKeys.list(page, limit),
    queryFn: () => countryApi.getAll(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Country Hook
export function useCountry(id: string) {
  return useQuery<CountryResponse>({
    queryKey: countryKeys.detail(id),
    queryFn: () => countryApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Country Mutations (Create, Update, Delete)
export function useCountryMutations() {
  const queryClient = useQueryClient();

  // Create Country
  const createMutation = useMutation({
    mutationFn: (dto: CreateCountryDto) => countryApi.create(dto),
    onSuccess: () => {
      // அனைத்து country query-களையும் invalidate செய்யும்
      queryClient.invalidateQueries({ queryKey: countryKeys.all });
    },
  });

  // Update Country
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCountryDto }) =>
      countryApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: countryKeys.all });
      queryClient.invalidateQueries({ queryKey: countryKeys.detail(variables.id) });
    },
  });

  // Delete Country
  const deleteMutation = useMutation({
    mutationFn: (id: string) => countryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: countryKeys.all });
    },
  });

  // ஒரே ஒரு Return மட்டுமே முடிவில் இருக்க வேண்டும்
  return {
    createCountry: createMutation.mutateAsync,
    updateCountry: updateMutation.mutateAsync,
    deleteCountry: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}