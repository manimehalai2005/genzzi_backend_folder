'use client';

import { stateApi } from '@/lib/api/StatesApi';
import { StateResponse, StatesPaginatedResponse } from '@/response/State';
import { 
  CreateStateDto, 
  UpdateStateDto 
} from '@/typess/State';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All States Hook (with Pagination)
export function useStates(page = 1, limit = 10) {
  return useQuery<StatesPaginatedResponse>({
    queryKey: ['states', page, limit],
    queryFn: () => stateApi.getAll(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single State Hook (Named useSingleState to avoid React.useState conflict)
export function useSingleState(id: string) {
  return useQuery<StateResponse>({
    queryKey: ['states', id],
    queryFn: () => stateApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create State Hook
export function useCreateState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateStateDto) => stateApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
    },
  });
}

// 4. Update State Hook
export function useUpdateState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateStateDto }) =>
      stateApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
      queryClient.invalidateQueries({ queryKey: ['states', variables.id] });
    },
  });
}

// 5. Delete State Hook
export function useDeleteState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => stateApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['states'] });
    },
  });
}