import { LucideIcon } from "lucide-react";

export interface Specialty {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  desc: string;
  activeCases: number;
  progress: number;
  statusText?: string;
  statusColor?: string;
}
