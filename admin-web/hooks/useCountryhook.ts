'use client';

import { CreateCountryDto, UpdateCountryDto } from '@/dto/Country';
import { countryApi } from '@/lib/api/CountryApi';
import { CountriesPaginatedResponse, CountryResponse } from '@/response/Country';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Countries Hook (with Pagination)
export function useCountries(page = 1, limit = 10) {
  return useQuery<CountriesPaginatedResponse>({
    queryKey: ['countries', page, limit],
    queryFn: () => countryApi.getAll(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Country Hook
export function useCountry(id: string) {
  return useQuery<CountryResponse>({
    queryKey: ['countries', id],
    queryFn: () => countryApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create Country Hook
export function useCreateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCountryDto) => countryApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
}

// 4. Update Country Hook
export function useUpdateCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCountryDto }) =>
      countryApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
      queryClient.invalidateQueries({ queryKey: ['countries', variables.id] });
    },
  });
}

// 5. Delete Country Hook
export function useDeleteCountry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => countryApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
}