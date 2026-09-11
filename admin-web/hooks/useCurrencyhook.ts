'use client';

import { currencyApi } from '@/lib/api/CurrencyApi';
import { CurrenciesPaginatedResponse, CurrencyResponse } from '@/response/Currency';
import { 
  CreateCurrencyDto, 
  UpdateCurrencyDto 
} from '@/typess/Currency';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Currencies Hook
export function useCurrencies() {
  return useQuery<CurrenciesPaginatedResponse>({
    queryKey: ['currencies'],
    queryFn: () => currencyApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Currency by Code Hook
export function useCurrency(code: string) {
  return useQuery<CurrencyResponse>({
    queryKey: ['currencies', code],
    queryFn: () => currencyApi.getByCode(code),
    enabled: !!code, // Execute only if code exists
  });
}

// 3. Create Currency Hook
export function useCreateCurrency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCurrencyDto) => currencyApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
}

// 4. Update Currency Hook
export function useUpdateCurrency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ code, dto }: { code: string; dto: UpdateCurrencyDto }) =>
      currencyApi.update(code, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
      queryClient.invalidateQueries({ queryKey: ['currencies', variables.code] });
    },
  });
}

// 5. Delete Currency Hook
export function useDeleteCurrency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => currencyApi.remove(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] });
    },
  });
}