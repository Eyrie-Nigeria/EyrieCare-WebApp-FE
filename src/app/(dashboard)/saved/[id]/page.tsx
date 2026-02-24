import { notFound } from "next/navigation";
import { getCaseStory } from "@/lib/data/cases";
import { CaseDetailHeader } from "@/components/saved/CaseDetailHeader";
import { CaseStoryDisplay } from "@/components/saved/CaseStoryDisplay";
import { CaseNotes } from "@/components/saved/CaseNotes";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClinicalCasePage({ params }: PageProps) {
  const { id } = await params;
  const caseData = getCaseStory(id);

  if (!caseData) {
    // In a real app, this would be a 404
    // needed because we only have one mock story
    if (id !== "case-001") {
      return (
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Case Not Found</h1>
          <p className="text-muted-foreground">
            For demonstration, please try{" "}
            <b className="text-foreground">Case #102</b> (ID: case-001). Only
            case-001 has full detailed story data mocked currently.
          </p>
        </div>
      );
    }
  }

  // Safe fallthrough for TS if we mock more cases later, but for now we know case-001 exists if we passed the check
  // or if getCaseStory returned something.
  if (!caseData) return notFound();

  return (
    <div className="flex-1 h-full overflow-y-auto bg-background-dashboard-light dark:bg-background-dashboard-dark">
      <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-8 pb-20">
        <CaseDetailHeader caseData={caseData} />
        <CaseStoryDisplay story={caseData} />
        <CaseNotes />
      </div>
    </div>
  );
}
