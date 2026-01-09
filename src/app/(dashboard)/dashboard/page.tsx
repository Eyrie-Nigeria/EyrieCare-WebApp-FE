'use client';

import {
    HeartPulse,
    BookOpenCheck,
    AlertCircle
} from 'lucide-react';
import DashboardHero from '@/components/dashboard/DashboardHero';
import StatCard from '@/components/dashboard/StatCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-8 md:gap-12">
            <DashboardHero />

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Cardiology Progress"
                    value="75%"
                    percentage={75}
                    icon={HeartPulse}
                    trend="+5% this week"
                />
                <StatCard
                    label="Questions Answered"
                    value="120"
                    percentage={45}
                    icon={BookOpenCheck}
                    trend="+12 today"
                    colorClass="bg-blue-500"
                    iconBgClass="bg-blue-50 dark:bg-blue-900/30"
                    iconColorClass="text-blue-600 dark:text-blue-400"
                />
                <StatCard
                    label="Pending Cases"
                    value="3"
                    percentage={20}
                    icon={AlertCircle}
                    trend="Due by Friday"
                    colorClass="bg-orange-500"
                    iconBgClass="bg-orange-50 dark:bg-orange-900/30"
                    iconColorClass="text-orange-600 dark:text-orange-400"
                />
            </section>

            <QuickActions />

            <RecentActivity />

            <footer className="mt-auto py-8 text-center text-text-dashboard-secondary-light dark:text-slate-600 text-xs font-medium">
                <p>© {new Date().getFullYear()} EyrieCare Medical Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}
