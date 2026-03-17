export interface Organization {
  id: string;
  name: string;
  slug: string;
  official_acronym: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface CreateOrganizationPayload {
  name: string;
  slug: string;
  official_acronym: string;
  is_active?: boolean;
}

export interface UpdateOrganizationPayload {
  name?: string;
  slug?: string;
  official_acronym?: string;
  is_active?: boolean;
}

export interface CreateUserPayload {
  email: string;
  role: "admin" | "user" | "superadmin";
  organization_id?: string | null;
  phone_number?: string;
  send_invite?: boolean;
  password?: string;
}

export interface BulkUserPayload {
  user_ids: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
}

export interface WaitlistEntry {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  grantedAccess: boolean;
  grantedAt: string | null;
}
