'use client';

import { CreateTimezoneDto, UpdateTimezoneDto } from '@/dto/TimeZone';
import { timezoneApi } from '@/lib/api/TimeZone';
import { TimezoneResponse, TimezonesPaginatedResponse } from '@/response/TimeZone';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Timezones Hook
export function useTimezones() {
  return useQuery<TimezonesPaginatedResponse>({
    queryKey: ['timezones'],
    queryFn: () => timezoneApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Timezone Hook
export function useTimezone(id: string) {
  return useQuery<TimezoneResponse>({
    queryKey: ['timezones', id],
    queryFn: () => timezoneApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create Timezone Hook
export function useCreateTimezone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateTimezoneDto) => timezoneApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timezones'] });
    },
  });
}

// 4. Update Timezone Hook
export function useUpdateTimezone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTimezoneDto }) =>
      timezoneApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['timezones'] });
      queryClient.invalidateQueries({ queryKey: ['timezones', variables.id] });
    },
  });
}

// 5. Delete Timezone Hook
export function useDeleteTimezone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => timezoneApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timezones'] });
    },
  });
}