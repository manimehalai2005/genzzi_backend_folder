'use client';

import { cityApi } from '@/lib/api/CityApi';
import { CitiesPaginatedResponse, CityResponse } from '@/response/City';
import { CreateCityDto, UpdateCityDto } from '@/typess/City';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Cities Hook
export function useCities() {
  return useQuery<CitiesPaginatedResponse>({
    queryKey: ['cities'],
    queryFn: () => cityApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single City Hook
export function useCity(id: string) {
  return useQuery<CityResponse>({
    queryKey: ['cities', id],
    queryFn: () => cityApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create City Hook
export function useCreateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCityDto) => cityApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
}

// 4. Update City Hook
export function useUpdateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCityDto }) =>
      cityApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      queryClient.invalidateQueries({ queryKey: ['cities', variables.id] });
    },
  });
}

// 5. Delete City Hook
export function useDeleteCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cityApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
}