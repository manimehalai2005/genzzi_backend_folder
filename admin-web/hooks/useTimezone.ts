'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  timezoneApi,
  CreateTimezoneDto,
  UpdateTimezoneDto,
  TimezoneResponse,
  TimezonesPaginatedResponse,
} from '@/app/api/TimeZone'; 

// Cache Management-க்கான Global Query Keys
export const timezoneKeys = {
  all: ['timezones'] as const,
  lists: () => [...timezoneKeys.all, 'list'] as const,
  details: () => [...timezoneKeys.all, 'detail'] as const,
  detail: (id: string) => [...timezoneKeys.details(), id] as const,
};

// 1. Fetch All Timezones Hook
export function useTimezones() {
  return useQuery<TimezonesPaginatedResponse>({
    queryKey: timezoneKeys.lists(),
    queryFn: () => timezoneApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Timezone Hook
export function useTimezone(id: string) {
  return useQuery<TimezoneResponse>({
    queryKey: timezoneKeys.detail(id),
    queryFn: () => timezoneApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. Timezone Mutations (Create, Update, Delete)
export function useTimezoneMutations() {
  const queryClient = useQueryClient();

  // Create Timezone
  const createMutation = useMutation({
    mutationFn: (dto: CreateTimezoneDto) => timezoneApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timezoneKeys.lists() });
    },
  });

  // Update Timezone
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTimezoneDto }) =>
      timezoneApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: timezoneKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: timezoneKeys.detail(variables.id),
      });
    },
  });

  // Delete Timezone
  const deleteMutation = useMutation({
    mutationFn: (id: string) => timezoneApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timezoneKeys.lists() });
    },
  });

  return {
    createTimezone: createMutation.mutateAsync,
    updateTimezone: updateMutation.mutateAsync,
    deleteTimezone: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}