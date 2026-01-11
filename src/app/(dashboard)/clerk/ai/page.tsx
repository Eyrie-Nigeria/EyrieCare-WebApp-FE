import ClerkingForm from "@/components/clerk/ai/ClerkingForm";
import AutoDraft from "@/components/clerk/ai/AutoDraft";
import { ClerkProvider } from "@/context/ClerkContext";

export default function AIClerkPage() {
  return (
    <ClerkProvider>
      <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-background-dashboard-light dark:bg-background-dashboard-dark">
        {/* Main Content - Centered Form */}
        <main className="flex-1 flex flex-col min-w-0 relative">
          <ClerkingForm />
        </main>

        {/* Right Sidebar - Auto Draft */}
        {/* Hidden on mobile and tablet, visible on xl and up */}
        <aside className="w-96 hidden xl:flex flex-col shrink-0 border-l border-slate-200 dark:border-card-dashboard-dark">
          <AutoDraft />
        </aside>
      </div>
    </ClerkProvider>
  );
}
