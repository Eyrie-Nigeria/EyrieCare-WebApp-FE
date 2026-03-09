export interface ApiMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error: unknown | null;
  meta: ApiMeta | null;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  email?: string;
  phone_number?: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface AcceptInvitePayload {
  token: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  phone_number: string | null;
  profile_picture_url: string | null;
  organization_id: string | null;
  role: string;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string | null;
}
