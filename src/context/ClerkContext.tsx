"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ClerkSection, ClerkState } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import {
  CreditCard,
  ClipboardList,
  History,
  Stethoscope,
  Baby,
  Syringe,
  Puzzle,
  Users,
  Pill,
} from "lucide-react";

// Mock Data for Pediatrics
const PEDIATRICS_SECTIONS: ClerkSection[] = [
  {
    id: "biodata",
    title: "Biodata",
    subtitle: "Basic patient demographics",
    icon: CreditCard,
    colorClass: "bg-teal-500/10",
    iconColor: "text-teal-500",
    questions: [
      { id: "q1", text: "What is the patient's full name?", status: "current" },
      { id: "q2", text: "And the patient's age?", status: "pending" },
      { id: "q3", text: "What is the patient's sex?", status: "pending" },
    ],
  },
  {
    id: "pc",
    title: "Presenting Complaint",
    subtitle: "Main symptoms & duration",
    icon: ClipboardList,
    colorClass: "bg-orange-500/10",
    iconColor: "text-orange-500",
    questions: [
      { id: "q4", text: "What is the main complaint?", status: "pending" },
      { id: "q5", text: "How long has it been present?", status: "pending" },
    ],
  },
  {
    id: "hpc",
    title: "Hx of Presenting Complaint",
    subtitle: "Onset, course, progression",
    icon: History,
    colorClass: "bg-blue-500/10",
    iconColor: "text-blue-500",
    questions: [
      {
        id: "q6",
        text: "How did the symptoms start (onset)?",
        status: "pending",
      },
      {
        id: "q7",
        text: "Is it getting worse or better (progression)?",
        status: "pending",
      },
    ],
  },
  {
    id: "pmh",
    title: "Past Medical History",
    subtitle: "Admissions, surgeries",
    icon: Stethoscope,
    colorClass: "bg-red-500/10",
    iconColor: "text-red-500",
    questions: [
      {
        id: "q8",
        text: "Any previous hospital admissions?",
        status: "pending",
      },
    ],
  },
  {
    id: "birth",
    title: "Birth History",
    subtitle: "Gestation, delivery",
    icon: Baby,
    colorClass: "bg-purple-500/10",
    iconColor: "text-purple-500",
    questions: [
      { id: "q9", text: "Was the baby carried to term?", status: "pending" },
    ],
  },
  {
    id: "imm",
    title: "Immunization",
    subtitle: "Vaccine status",
    icon: Syringe,
    colorClass: "bg-green-500/10",
    iconColor: "text-green-500",
    questions: [
      { id: "q10", text: "Is immunization up to date?", status: "pending" },
    ],
  },
  {
    id: "dev",
    title: "Developmental",
    subtitle: "Milestones",
    icon: Puzzle,
    colorClass: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
    questions: [
      {
        id: "q11",
        text: "Has the child met age-appropriate milestones?",
        status: "pending",
      },
    ],
  },
  {
    id: "social",
    title: "Family & Social",
    subtitle: "Structure, SES",
    icon: Users,
    colorClass: "bg-pink-500/10",
    iconColor: "text-pink-500",
    questions: [
      {
        id: "q12",
        text: "Tell me about the family structure.",
        status: "pending",
      },
    ],
  },
  {
    id: "drug",
    title: "Drug & Allergy",
    subtitle: "Meds, reactions",
    icon: Pill,
    colorClass: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    questions: [{ id: "q13", text: "Any known allergies?", status: "pending" }],
  },
];

interface ClerkContextType extends ClerkState {
  setSpecialty: (specialty: string) => void;
  setActiveSection: (id: string | null) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  skipQuestion: (questionId: string) => void;
}

const ClerkContext = createContext<ClerkContextType | undefined>(undefined);

export function ClerkProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const urlSpecialty = searchParams?.get("specialty");

  const [specialty, setSpecialty] = useState<string | null>(urlSpecialty);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    "biodata",
  );
  const [sections, setSections] = useState<ClerkSection[]>(PEDIATRICS_SECTIONS);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Sync specialty state with URL
  useEffect(() => {
    if (urlSpecialty && urlSpecialty !== specialty) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSpecialty(urlSpecialty);
    }
  }, [urlSpecialty, specialty]);

  const updateQuestionStatus = (
    questionId: string,
    status: "answered" | "skipped",
    answerText?: string,
  ) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        questions: section.questions.map((q, idx, arr) => {
          if (q.id === questionId) {
            return {
              ...q,
              status,
              answer: answerText,
            };
          }
          // Auto-set next pending question to 'current'
          if (q.id === questionId && idx < arr.length - 1) {
            // We'll handle this logic in the submitAnswer mainly,
            // but strictly we should find the NEXT pending question in the loop and set it to current.
            // For simplicity, let's do a simplified approach:
            // The consuming component will usually determine NEXT question.
            // But let's try to be smart here.
          }
          return q;
        }),
      })),
    );
    // If there is a next question in the SAME section that is pending, set it to current
    setSections((prev) => {
      return prev.map((section) => {
        const qIndex = section.questions.findIndex((q) => q.id === questionId);
        if (qIndex !== -1 && qIndex < section.questions.length - 1) {
          const nextQ = section.questions[qIndex + 1];
          if (nextQ.status === "pending") {
            // Found next pending
            const newQuestions = [...section.questions];
            newQuestions[qIndex + 1] = { ...nextQ, status: "current" };
            return { ...section, questions: newQuestions };
          }
        }
        return section;
      });
    });

    if (answerText) {
      setAnswers((prev) => ({ ...prev, [questionId]: answerText }));
    }
  };

  const submitAnswer = (questionId: string, answer: string) => {
    updateQuestionStatus(questionId, "answered", answer);
  };

  const skipQuestion = (questionId: string) => {
    updateQuestionStatus(questionId, "skipped");
  };

  const setActiveSection = (id: string | null) => {
    setActiveSectionId(id);
  };

  return (
    <ClerkContext.Provider
      value={{
        specialty,
        sections,
        activeSectionId,
        answers,
        setSpecialty,
        setActiveSection,
        submitAnswer,
        skipQuestion,
      }}
    >
      {children}
    </ClerkContext.Provider>
  );
}

export function useClerk() {
  const context = useContext(ClerkContext);
  if (context === undefined) {
    throw new Error("useClerk must be used within a ClerkProvider");
  }
  return context;
}
