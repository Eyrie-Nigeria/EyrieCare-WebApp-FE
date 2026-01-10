import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  percentage: number;
  icon: LucideIcon;
  trend?: string;
  colorClass?: string;
  iconBgClass?: string;
  iconColorClass?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export interface TopHeaderProps {
  onMenuClick?: () => void;
  searchPlaceholder?: string;
}

export interface Activity {
  title: string;
  type: string;
  status: string;
  statusColor: string;
  date: string;
}

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  hoverBg: string;
}
