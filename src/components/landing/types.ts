export interface Feature {
    icon: any; // Using any for Lucide icons
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
    icon: any;
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
