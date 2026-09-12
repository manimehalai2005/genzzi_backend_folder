'use client';

import { CreateSkillDto, UpdateSkillDto } from '@/dto/Skill';
import { skillApi } from '@/lib/api/SkillApi';
import { SkillResponse, SkillsPaginatedResponse } from '@/response/Skills';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. Fetch All Skills Hook
export function useSkills() {
  return useQuery<SkillsPaginatedResponse>({
    queryKey: ['skills'],
    queryFn: () => skillApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// 2. Fetch Single Skill Hook
export function useSkill(id: string) {
  return useQuery<SkillResponse>({
    queryKey: ['skills', id],
    queryFn: () => skillApi.getById(id),
    enabled: !!id, // Execute only if ID exists
  });
}

// 3. Create Skill Hook
// 3. Create Skill Hook
export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateSkillDto) => skillApi.create(dto),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.refetchQueries({ queryKey: ['skills'] }); // Instant-ah fetch panna ithu help pannum
    },
  });
}

// 4. Update Skill Hook
export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateSkillDto }) =>
      skillApi.update(id, dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['skills', variables.id] });
    },
  });
}

// 5. Delete Skill Hook
export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => skillApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
}