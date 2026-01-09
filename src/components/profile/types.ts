import { LucideIcon } from 'lucide-react';

export interface AcademicFieldProps {
    label: string;
    value: string;
}

export interface CertItemProps {
    title: string;
    date: string;
}

export interface ResultItemProps {
    subject: string;
    score: string;
}

export interface SettingItemProps {
    title: string;
    description: string;
    defaultChecked?: boolean;
}

export interface PreferenceToggleProps {
    label: string;
    sublabel: string;
    defaultChecked?: boolean;
}

export interface ProfileTabProps {
    // Generic interface for tab components if needed
}
