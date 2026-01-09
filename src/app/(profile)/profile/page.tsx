'use client';

import { useState } from 'react';
import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import PersonalInfoForm from '@/components/profile/PersonalInfoForm';
import SecurityTab from '@/components/profile/SecurityTab';
import PreferencesTab from '@/components/profile/PreferencesTab';
import AcademicTab from '@/components/profile/AcademicTab';
import ProfileWidgets from '@/components/profile/ProfileWidgets';
import { User, ShieldCheck, Settings2, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/cn';

const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Account Security', icon: ShieldCheck },
    { id: 'preferences', label: 'App Preferences', icon: Settings2 },
    { id: 'academic', label: 'Academic History', icon: GraduationCap },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return <PersonalInfoForm />;
            case 'security':
                return <SecurityTab />;
            case 'preferences':
                return <PreferencesTab />;
            case 'academic':
                return <AcademicTab />;
            default:
                return <PersonalInfoForm />;
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            <ProfileInfoCard />

            {/* Dynamic Tabs Navigation */}
            <nav className="flex border-b border-slate-200 dark:border-card-dashboard-dark overflow-x-auto no-scrollbar scroll-smooth">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap text-sm group",
                                isActive
                                    ? "border-primary-dashboard text-primary-dashboard font-bold"
                                    : "border-transparent text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark hover:text-slate-900 dark:hover:text-white font-medium"
                            )}
                        >
                            <tab.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-primary-dashboard" : "opacity-70")} />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Content (Forms/Tabs) */}
                <div className="lg:col-span-2">
                    {renderTabContent()}
                </div>

                {/* Sidebar Widgets */}
                <div className="hidden lg:block sticky top-6">
                    <ProfileWidgets />
                </div>
            </div>

            <div className="lg:hidden mt-4">
                <ProfileWidgets />
            </div>

            <footer className="mt-8 py-6 text-center text-text-dashboard-secondary-light dark:text-slate-600 text-xs font-medium border-t border-slate-100 dark:border-card-dashboard-dark/30">
                <p>© {new Date().getFullYear()} EyrieCare Medical Platform. Student Profile Console.</p>
            </footer>
        </div>
    );
}
