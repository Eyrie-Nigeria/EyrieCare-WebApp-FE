import { Certificate, AcademicResult } from "@/lib/types";
export type { Certificate, AcademicResult };

export interface AcademicFieldProps {
  label: string;
  value: string;
}

export type CertItemProps = Certificate;
export type ResultItemProps = AcademicResult;

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

export type ProfileTabProps = Record<string, never>;
