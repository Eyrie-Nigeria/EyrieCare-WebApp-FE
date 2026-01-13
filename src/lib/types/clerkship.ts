import { LucideIcon } from "lucide-react";

export type StepStatus = "upcoming" | "current" | "completed";

export interface ClerkStep {
  id: string;
  name: string;
  status: StepStatus;
  path: string;
}

export type QuestionStatus = "pending" | "current" | "answered" | "skipped";

export interface AIQuestion {
  id: string;
  text: string;
  answer?: string;
  status: QuestionStatus;
}

export interface ClerkSection {
  id: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  colorClass?: string;
  iconColor?: string;
  questions: AIQuestion[];
}

export interface ClerkState {
  specialty: string | null;
  activeSectionId: string | null;
  sections: ClerkSection[];
  answers: Record<string, string>;
}
