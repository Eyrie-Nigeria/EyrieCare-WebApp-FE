import { LucideIcon } from "lucide-react";

export type StepStatus = "completed" | "in-progress" | "upcoming";

export interface ClerkStep {
  label: string;
  status: StepStatus;
  icon: LucideIcon;
  colorClass: string;
  iconColor: string;
}

export type QuestionStatus = "pending" | "current" | "answered" | "skipped";

export interface AIQuestion {
  id: string;
  text: string;
  status: QuestionStatus;
  answer?: string;
}

export interface ClerkSection {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  iconColor: string;
  questions: AIQuestion[];
}

export interface ClerkState {
  specialty: string | null;
  sections: ClerkSection[];
  activeSectionId: string | null;
  answers: Record<string, string>; // questionId -> answer
}

export interface CaseProgressProps {
  className?: string;
}

export interface ChatInterfaceProps {
  className?: string;
  onSendMessage?: (message: string) => void;
}

export interface AutoDraftProps {
  className?: string;
  onClose?: () => void;
}

export interface SpecialtyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Manual Clerking Types
export type ManualFieldType =
  | "text"
  | "textarea"
  | "select"
  | "custom"
  | "checkbox";

export interface ManualField {
  id: string;
  label: string;
  placeholder?: string;
  type: ManualFieldType;
  options?: string[]; // For 'select'
  rows?: number; // For 'textarea'
  width?: "full" | "half"; // Layout hint
}

export interface ManualSection {
  id: string;
  title: string;
  icon: LucideIcon;
  fields: ManualField[];
}
