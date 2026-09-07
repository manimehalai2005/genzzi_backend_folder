'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  currencyApi,
  CreateCurrencyDto,
  UpdateCurrencyDto,
  CurrencyResponse,
  CurrenciesPaginatedResponse,
} from '@/app/api/CurrencyApi';


export const currencyKeys = {
  all: ['currencies'] as const,
  lists: () => [...currencyKeys.all, 'list'] as const,
  details: () => [...currencyKeys.all, 'detail'] as const,
  detail: (code: string) => [...currencyKeys.details(), code] as const,
};

// 1. Fetch All Currencies Hook
export function useCurrencies() {
  return useQuery<CurrenciesPaginatedResponse>({
    queryKey: currencyKeys.lists(),
    queryFn: () => currencyApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Currency Hook by Code
export function useCurrency(code: string) {
  return useQuery<CurrencyResponse>({
    queryKey: currencyKeys.detail(code),
    queryFn: () => currencyApi.getByCode(code),
    enabled: !!code, 
  });
}

// 3. Currency Mutations (Create, Update, Delete)
export function useCurrencyMutations() {
  const queryClient = useQueryClient();

  // Create Currency
  const createMutation = useMutation({
    mutationFn: (dto: CreateCurrencyDto) => currencyApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.lists() });
    },
  });

  // Update Currency by Code
  const updateMutation = useMutation({
    mutationFn: ({ code, dto }: { code: string; dto: UpdateCurrencyDto }) =>
      currencyApi.update(code, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: currencyKeys.detail(variables.code),
      });
    },
  });

  // Delete Currency by Code
  const deleteMutation = useMutation({
    mutationFn: (code: string) => currencyApi.remove(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.lists() });
    },
  });

  return {
    createCurrency: createMutation.mutateAsync,
    updateCurrency: updateMutation.mutateAsync,
    deleteCurrency: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}