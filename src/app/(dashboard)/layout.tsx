'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import TopHeader from '@/components/dashboard/TopHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background-dashboard-light dark:bg-background-dashboard-dark text-slate-900 dark:text-white font-dashboard transition-colors duration-200 overflow-hidden h-screen w-full flex">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <TopHeader />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 scroll-smooth custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
