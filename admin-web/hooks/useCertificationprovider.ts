'use client';

import { certificationProviderApi } from '@/lib/api/CertificationProviderApi';
import { CertificationProviderResponse, CertificationProvidersPaginatedResponse } from '@/response/Certificate-provider';
import { CreateCertificationProviderDto, UpdateCertificationProviderDto } from '@/typess/Certificate-provider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Certification Providers Hook
export function useCertificationProviders() {
  return useQuery<CertificationProvidersPaginatedResponse>({
    queryKey: ['certification-providers'],
    queryFn: () => certificationProviderApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Certification Provider Hook
export function useCertificationProvider(id: string) {
  return useQuery<CertificationProviderResponse>({
    queryKey: ['certification-providers', id],
    queryFn: () => certificationProviderApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create Certification Provider Hook
export function useCreateCertificationProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCertificationProviderDto) =>
      certificationProviderApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certification-providers'] });
    },
  });
}

// 4. Update Certification Provider Hook
export function useUpdateCertificationProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCertificationProviderDto }) =>
      certificationProviderApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['certification-providers'] });
      queryClient.invalidateQueries({
        queryKey: ['certification-providers', variables.id],
      });
    },
  });
}

// 5. Delete Certification Provider Hook
export function useDeleteCertificationProvider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => certificationProviderApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certification-providers'] });
    },
  });
}