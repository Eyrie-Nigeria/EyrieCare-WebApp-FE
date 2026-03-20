import { apiClient as api } from "@/lib/api-client";
import {
  Specialty,
  CreateSpecialtyRequest,
  UpdateSpecialtyRequest,
  SpecialtyResponse,
  SpecialtiesResponse,
} from "@/lib/types/specialties";

export const specialtyService = {
  getSpecialties: async (params?: {
    page?: number;
    per_page?: number;
    name?: string;
    category?: string;
    is_active?: boolean;
  }): Promise<SpecialtiesResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.per_page)
      queryParams.set("per_page", params.per_page.toString());
    if (params?.name) queryParams.set("name", params.name);
    if (params?.category) queryParams.set("category", params.category);
    if (params?.is_active !== undefined)
      queryParams.set("is_active", params.is_active.toString());

    return api<SpecialtiesResponse>(`/specialties?${queryParams.toString()}`, {
      method: "GET",
    });
  },

  getSpecialty: async (id: string): Promise<SpecialtyResponse> => {
    return api<SpecialtyResponse>(`/specialties/${id}`, {
      method: "GET",
    });
  },

  createSpecialty: async (data: CreateSpecialtyRequest): Promise<Specialty> => {
    const response = await api<SpecialtyResponse>("/specialties", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.data;
  },

  updateSpecialty: async (params: {
    id: string;
    data: UpdateSpecialtyRequest;
  }): Promise<Specialty> => {
    const response = await api<SpecialtyResponse>(`/specialties/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    return response.data;
  },

  deleteSpecialty: async (id: string): Promise<void> => {
    await api(`/specialties/${id}`, {
      method: "DELETE",
    });
  },

  uploadSpecialtyImage: async (params: {
    id: string;
    file: File;
  }): Promise<void> => {
    const formData = new FormData();
    formData.append("file", params.file);

    await api(`/specialties/${params.id}/image`, {
      method: "POST",
      body: formData,
    });
  },
};
