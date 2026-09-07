'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  certificationProviderApi,
  CreateCertificationProviderDto,
  UpdateCertificationProviderDto,
  CertificationProviderResponse,
  CertificationProvidersPaginatedResponse,
} from '@/app/api/CertificationProviderApi'; // உங்கள் API கோப்பு பாதையை சரிபார்க்கவும்

// Global Query Keys for Cache Management
export const certificationProviderKeys = {
  all: ['certification-providers'] as const,
  lists: () => [...certificationProviderKeys.all, 'list'] as const,
  details: () => [...certificationProviderKeys.all, 'detail'] as const,
  detail: (id: string) => [...certificationProviderKeys.details(), id] as const,
};

// 1. Fetch All Certification Providers Hook
export function useCertificationProviders() {
  return useQuery<CertificationProvidersPaginatedResponse>({
    queryKey: certificationProviderKeys.lists(),
    queryFn: () => certificationProviderApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Certification Provider Hook
export function useCertificationProvider(id: string) {
  return useQuery<CertificationProviderResponse>({
    queryKey: certificationProviderKeys.detail(id),
    queryFn: () => certificationProviderApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Certification Provider Mutations (Create, Update, Delete)
export function useCertificationProviderMutations() {
  const queryClient = useQueryClient();

  // Create Certification Provider
  const createMutation = useMutation({
    mutationFn: (dto: CreateCertificationProviderDto) =>
      certificationProviderApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certificationProviderKeys.lists() });
    },
  });

  // Update Certification Provider
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCertificationProviderDto }) =>
      certificationProviderApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: certificationProviderKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: certificationProviderKeys.detail(variables.id),
      });
    },
  });

  // Delete Certification Provider
  const deleteMutation = useMutation({
    mutationFn: (id: string) => certificationProviderApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certificationProviderKeys.lists() });
    },
  });

  return {
    createProvider: createMutation.mutateAsync,
    updateProvider: updateMutation.mutateAsync,
    deleteProvider: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}