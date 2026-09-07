'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  languageApi,
  CreateLanguageDto,
  UpdateLanguageDto,
  LanguageResponse,
  LanguagesPaginatedResponse,
} from '@/app/api/LanguageApi'; // உங்கள் API கோப்பு பாதையை சரிபார்க்கவும்

// Cache Management-க்கான Global Query Keys
export const languageKeys = {
  all: ['languages'] as const,
  lists: () => [...languageKeys.all, 'list'] as const,
  details: () => [...languageKeys.all, 'detail'] as const,
  detail: (code: string) => [...languageKeys.details(), code] as const,
};

// 1. Fetch All Languages Hook
export function useLanguages() {
  return useQuery<LanguagesPaginatedResponse>({
    queryKey: languageKeys.lists(),
    queryFn: () => languageApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Language Hook by Code
export function useLanguage(code: string) {
  return useQuery<LanguageResponse>({
    queryKey: languageKeys.detail(code),
    queryFn: () => languageApi.getByCode(code),
    enabled: !!code, // code இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. Language Mutations (Create, Update, Delete)
export function useLanguageMutations() {
  const queryClient = useQueryClient();

  // Create Language
  const createMutation = useMutation({
    mutationFn: (dto: CreateLanguageDto) => languageApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: languageKeys.lists() });
    },
  });

  // Update Language by Code
  const updateMutation = useMutation({
    mutationFn: ({ code, dto }: { code: string; dto: UpdateLanguageDto }) =>
      languageApi.update(code, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: languageKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: languageKeys.detail(variables.code),
      });
    },
  });

  // Delete Language by Code
  const deleteMutation = useMutation({
    mutationFn: (code: string) => languageApi.remove(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: languageKeys.lists() });
    },
  });

  return {
    createLanguage: createMutation.mutateAsync,
    updateLanguage: updateMutation.mutateAsync,
    deleteLanguage: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}