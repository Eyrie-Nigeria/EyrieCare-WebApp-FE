export interface Vitals {
  bp: string;
  heartRate: number;
  temp: string;
  respiratoryRate: number;
  spo2: number;
}

export interface Case {
  id: string;
  patientName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  specialtyId: string;
  chiefComplaint: string;
  status: "Draft" | "Finalized";
  date: string;
  time: string;
  previewMatch?: number; // % match for AI cases
}

export interface ClinicalStory extends Case {
  vitals: Vitals;
  hpi: string;
  physicalExam: string;
  assessment: string;
  plan: string;
  studentNotes?: string;
}
