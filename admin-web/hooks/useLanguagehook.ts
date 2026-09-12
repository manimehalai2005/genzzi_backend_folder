'use client';


import { CreateLanguageDto, UpdateLanguageDto } from '@/dto/language';
import { languageApi } from '@/lib/api/LanguageApi';
import { LanguageResponse, LanguagesPaginatedResponse } from '@/response/Language';
import { 
 
} from '@/typess/language';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Languages Hook
export function useLanguages() {
  return useQuery<LanguagesPaginatedResponse>({
    queryKey: ['languages'],
    queryFn: () => languageApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Language by Code Hook
export function useLanguage(id: string) {
  return useQuery<LanguageResponse>({
    queryKey: ['languages', id],
    queryFn: () => languageApi.getByCode(id),
    enabled: !!id,
  });
}

// 3. Create Language Hook
export function useCreateLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateLanguageDto) => languageApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
}

// 4. Update Language Hook
export function useUpdateLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id ,dto }: { id: string; dto: UpdateLanguageDto }) =>
      languageApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
      queryClient.invalidateQueries({ queryKey: ['languages', variables.id] });
    },
  });
}

// 5. Delete Language Hook
export function useDeleteLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => languageApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
    },
  });
}