'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const activities = [
    {
        title: 'Acute Coronary Syndrome',
        type: 'Case Study',
        status: 'In Progress',
        statusColor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
        date: '2 hours ago'
    },
    {
        title: 'Respiratory System Quiz',
        type: 'Test',
        status: 'Completed (90%)',
        statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
        date: 'Yesterday'
    },
    {
        title: 'Pediatric Dosage Calc',
        type: 'Practice',
        status: 'Completed (100%)',
        statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
        date: '2 days ago'
    }
];

export default function RecentActivity() {
    return (
        <section className="mt-4 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                    Recent Activity
                </h2>
                <Link
                    href="/dashboard/activity"
                    className="text-primary-dashboard text-sm font-bold hover:opacity-80 transition-all flex items-center gap-1 group"
                >
                    View All
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-card-dashboard-dark bg-card-dashboard-light dark:bg-card-dashboard-dark shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-900/40 text-xs uppercase text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark border-b border-slate-200 dark:border-card-dashboard-dark">
                        <tr>
                            <th className="px-6 py-4 font-bold tracking-wider" scope="col">Activity</th>
                            <th className="px-6 py-4 font-bold tracking-wider" scope="col">Type</th>
                            <th className="px-6 py-4 font-bold tracking-wider" scope="col">Status</th>
                            <th className="px-6 py-4 font-bold tracking-wider text-right" scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {activities.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors group">
                                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
                                    {item.type}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold",
                                        item.statusColor
                                    )}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark italic opacity-80">
                                    {item.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
