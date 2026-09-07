'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  stateApi,
  CreateStateDto,
  UpdateStateDto,
  StateResponse,
  StatesPaginatedResponse,
} from '@/app/api/StatesApi'; // உங்கள் API file path-ஐ சரிபார்க்கவும்

// Global Query Keys for Cache Management
export const stateKeys = {
  all: ['states'] as const,
  lists: () => [...stateKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...stateKeys.lists(), { page, limit }] as const,
  details: () => [...stateKeys.all, 'detail'] as const,
  detail: (id: string) => [...stateKeys.details(), id] as const,
};

// 1. Fetch All States Hook (Paginated)
export function useStates(page = 1, limit = 10) {
  return useQuery<StatesPaginatedResponse>({
    queryKey: stateKeys.list(page, limit),
    queryFn: () => stateApi.getAll(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single State Hook
export function useState(id: string) {
  return useQuery<StateResponse>({
    queryKey: stateKeys.detail(id),
    queryFn: () => stateApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. State Mutations (Create, Update, Delete)
export function useStateMutations() {
  const queryClient = useQueryClient();

  // Create State
  const createMutation = useMutation({
    mutationFn: (dto: CreateStateDto) => stateApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stateKeys.lists() });
    },
  });

  // Update State
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateStateDto }) =>
      stateApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: stateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: stateKeys.detail(variables.id) });
    },
  });

  // Delete State
  const deleteMutation = useMutation({
    mutationFn: (id: string) => stateApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: stateKeys.lists() });
    },
  });

  return {
    createState: createMutation.mutateAsync,
    updateState: updateMutation.mutateAsync,
    deleteState: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}