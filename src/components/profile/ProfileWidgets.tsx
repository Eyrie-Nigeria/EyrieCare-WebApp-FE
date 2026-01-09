'use client';

import { CheckCircle2, Circle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfileWidgets() {
    return (
        <div className="flex flex-col gap-6">
            {/* Profile Strength Widget */}
            <div className="bg-surface-dashboard-light dark:bg-surface-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-card-dashboard-dark transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Profile Strength</h4>
                    <span className="text-xs font-bold text-primary-dashboard bg-primary-dashboard/10 px-2 py-1 rounded-full">80%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-background-dashboard-dark rounded-full h-2 mb-6">
                    <div className="bg-primary-dashboard h-2 rounded-full shadow-[0_0_8px_rgba(17,212,82,0.4)]" style={{ width: '80%' }}></div>
                </div>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-text-dashboard-secondary-light/70 line-through decoration-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-primary-dashboard" />
                        <span>Upload avatar</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-text-dashboard-secondary-light/70 line-through decoration-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-primary-dashboard" />
                        <span>Confirm email</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-white font-medium">
                        <Circle className="w-5 h-5 text-slate-300 dark:text-card-dashboard-dark" />
                        <span>Add bio description</span>
                    </li>
                </ul>
            </div>

            {/* Quick Preferences Widget */}
            <div className="bg-surface-dashboard-light dark:bg-surface-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-card-dashboard-dark transition-all duration-300">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-5">Quick Preferences</h4>
                <div className="space-y-5">
                    <PreferenceToggle
                        label="Email Digest"
                        sublabel="Daily summary"
                        defaultChecked
                    />
                    <PreferenceToggle
                        label="Exam Alerts"
                        sublabel="Push notifications"
                        defaultChecked
                    />
                    <PreferenceToggle
                        label="Dark Mode"
                        sublabel="System default"
                    />
                </div>
                <button className="w-full mt-6 text-xs font-bold text-primary-dashboard hover:underline text-left transition-all">
                    Manage all notifications
                </button>
            </div>

            {/* Logout Link */}
            <div className="px-2">
                <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-bold transition-all group">
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Log Out
                </button>
            </div>
        </div>
    );
}

function PreferenceToggle({ label, sublabel, defaultChecked = false }: { label: string, sublabel: string, defaultChecked?: boolean }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 dark:text-white">{label}</span>
                <span className="text-[11px] text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">{sublabel}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
                <div className="w-10 h-5 bg-slate-200 dark:bg-card-dashboard-dark/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-dashboard"></div>
            </label>
        </div>
    );
}
