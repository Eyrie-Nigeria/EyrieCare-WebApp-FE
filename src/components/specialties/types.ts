import { Specialty } from "@/lib/types/specialties";

export interface SpecialtyGridProps {
  specialties: Specialty[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface SpecialtyCardProps {
  specialty: Specialty;
  index: number;
}
