import { ManualClerkingForm } from "@/components/clerk/manual";

export default function ManualClerkPage() {
  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-background-dashboard-light dark:bg-background-dashboard-dark">
      <main className="flex-1 flex flex-col min-w-0 relative p-4 lg:p-6 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto w-full">
          <ManualClerkingForm />
        </div>
      </main>
    </div>
  );
}
