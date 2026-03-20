export const SPECIALTY_CATEGORIES = [
  "Clinical",
  "Surgical",
  "Diagnostics",
  "Pediatrics",
  "Emergency",
  "Public Health",
  "Mental Health",
  "Anesthesia",
] as const;

export type SpecialtyCategory = (typeof SPECIALTY_CATEGORIES)[number];

export const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Clinical: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
  },
  Surgical: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/20",
  },
  Diagnostics: {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/20",
  },
  Pediatrics: {
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    border: "border-pink-500/20",
  },
  Emergency: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/20",
  },
  Default: {
    bg: "bg-slate-500/10",
    text: "text-slate-500",
    border: "border-slate-500/20",
  },
};
