'use client';

import { fileTypeApi } from '@/lib/api/FileTypeApi';
import { FileTypeResponse, FileTypesPaginatedResponse } from '@/response/FileType';
import { 
  CreateFileTypeDto, 
  UpdateFileTypeDto 
} from '@/typess/FilteType';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All File Types Hook
export function useFileTypes() {
  return useQuery<FileTypesPaginatedResponse>({
    queryKey: ['file-types'],
    queryFn: () => fileTypeApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single File Type Hook
export function useFileType(id: string) {
  return useQuery<FileTypeResponse>({
    queryKey: ['file-types', id],
    queryFn: () => fileTypeApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create File Type Hook
export function useCreateFileType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateFileTypeDto) => fileTypeApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file-types'] });
    },
  });
}

// 4. Update File Type Hook
export function useUpdateFileType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateFileTypeDto }) =>
      fileTypeApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['file-types'] });
      queryClient.invalidateQueries({ queryKey: ['file-types', variables.id] });
    },
  });
}

// 5. Delete File Type Hook
export function useDeleteFileType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => fileTypeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file-types'] });
    },
  });
}