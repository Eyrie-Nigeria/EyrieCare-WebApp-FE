import {
  StepStatus,
  ClerkStep,
  QuestionStatus,
  AIQuestion,
  ClerkSection,
  ClerkState,
} from "@/lib/types";

export type {
  StepStatus,
  ClerkStep,
  QuestionStatus,
  AIQuestion,
  ClerkSection,
  ClerkState,
};

export interface SpecialtyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSpecialty?: string;
}

export interface ManualClerkField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "number";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface AutoDraftProps {
  onClose?: () => void;
}
