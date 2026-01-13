import { Case } from "@/lib/types/cases";

export interface CaseLibraryProps {
  cases: Case[];
}

export interface CaseTableRowProps {
  caseItem: Case;
}

export interface CaseCardProps {
  caseItem: Case;
}
