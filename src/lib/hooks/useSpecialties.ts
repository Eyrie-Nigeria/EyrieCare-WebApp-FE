import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { specialtyService } from "@/services/specialty.service";
import { UpdateSpecialtyRequest } from "@/lib/types/specialties";

export const useSpecialties = (params?: {
  page?: number;
  per_page?: number;
  name?: string;
  category?: string;
  is_active?: boolean;
}) => {
  return useQuery({
    queryKey: ["specialties", params],
    queryFn: () => specialtyService.getSpecialties(params),
  });
};

export const useSpecialty = (id: string) => {
  return useQuery({
    queryKey: ["specialty", id],
    queryFn: () => specialtyService.getSpecialty(id),
    enabled: !!id,
  });
};

export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: specialtyService.createSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
  });
};

export const useUpdateSpecialty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: string; data: UpdateSpecialtyRequest }) =>
      specialtyService.updateSpecialty(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      queryClient.invalidateQueries({ queryKey: ["specialty", data.id] });
    },
  });
};

export const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: specialtyService.deleteSpecialty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
  });
};

export const useUploadSpecialtyImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: string; file: File }) =>
      specialtyService.uploadSpecialtyImage(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
      queryClient.invalidateQueries({ queryKey: ["specialty", variables.id] });
    },
  });
};
