export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  subtitle: string;
}

export interface Stat {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinks {
  [category: string]: FooterLink[];
}

export interface Institution {
  name: string;
}
