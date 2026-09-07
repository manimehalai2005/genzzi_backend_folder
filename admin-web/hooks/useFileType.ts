'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fileTypeApi,
  CreateFileTypeDto,
  UpdateFileTypeDto,
  FileTypeResponse,
  FileTypesPaginatedResponse,
} from '@/app/api/FileTypeApi'; 

// Cache Management-க்கான Global Query Keys
export const fileTypeKeys = {
  all: ['file-types'] as const,
  lists: () => [...fileTypeKeys.all, 'list'] as const,
  details: () => [...fileTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...fileTypeKeys.details(), id] as const,
};

// 1. Fetch All File Types Hook
export function useFileTypes() {
  return useQuery<FileTypesPaginatedResponse>({
    queryKey: fileTypeKeys.lists(),
    queryFn: () => fileTypeApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single File Type Hook
export function useFileType(id: string) {
  return useQuery<FileTypeResponse>({
    queryKey: fileTypeKeys.detail(id),
    queryFn: () => fileTypeApi.getById(id),
    enabled: !!id, // ID இருந்தால் மட்டுமே இயங்கும்
  });
}

// 3. File Type Mutations (Create, Update, Delete)
export function useFileTypeMutations() {
  const queryClient = useQueryClient();

  // Create File Type
  const createMutation = useMutation({
    mutationFn: (dto: CreateFileTypeDto) => fileTypeApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileTypeKeys.lists() });
    },
  });

  // Update File Type
  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateFileTypeDto }) =>
      fileTypeApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: fileTypeKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: fileTypeKeys.detail(variables.id),
      });
    },
  });

  // Delete File Type
  const deleteMutation = useMutation({
    mutationFn: (id: string) => fileTypeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileTypeKeys.lists() });
    },
  });

  return {
    createFileType: createMutation.mutateAsync,
    updateFileType: updateMutation.mutateAsync,
    deleteFileType: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}