import React from "react";

export interface SpecialtyResource {
  id: string;
  title: string;
  url: string;
}

export interface Specialty {
  id: string;
  organization_id?: string | null;
  name: string;
  description?: string;
  image_url?: string | null;
  category?: string;
  is_active?: boolean;
  resources?: SpecialtyResource[];
  created_at?: string;
  updated_at?: string;

  // UI-only computed properties or transition properties
  activeCases?: number;
  progress?: number;
  statusText?: string;
  statusColor?: string;
  icon?: React.ElementType;
  color?: string;
  bg?: string;
  border?: string;
  desc?: string;
}

export interface SpecialtyResponse {
  success: boolean;
  message: string;
  data: Specialty;
  error: string | null;
}

export interface SpecialtiesResponse {
  success: boolean;
  message: string;
  data: {
    data: Specialty[];
  };
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
  error: string | null;
}

export interface CreateSpecialtyRequest {
  name: string;
  description: string;
  category: string;
  is_active: boolean;
  organization_id?: string | null;
  resources: { title: string; url: string }[];
}

export interface UpdateSpecialtyRequest extends Partial<CreateSpecialtyRequest> {
  resources?: SpecialtyResource[];
}
