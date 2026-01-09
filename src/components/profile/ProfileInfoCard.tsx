'use client';

import { motion } from 'framer-motion';
import { Camera, GraduationCap, Stethoscope, MapPin, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfileInfoCard() {
    return (
        <section className="bg-surface-dashboard-light dark:bg-surface-dashboard-dark rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-card-dashboard-dark transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                {/* Avatar Section */}
                <div className="relative group">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full size-32 md:size-40 border-4 border-slate-100 dark:border-background-dashboard-dark shadow-md"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBO31lvdoCr6L5WXM8qUYxa9Md8rXwogb2zLFVXK96e-Ix4nHsKDSmzP1xl8Mx3Dru_StdgiCGNlCkP55c6MPidspN8JFHzqZ_HZi8P7vk5SvR5Z9-y1KQeoqLnIUB7o1pFuw_eQutHCxxSioRBJPK6yN5pmsJsgToL6mBQg9xpfoDH-N_mBdbx3Cw6DI7VJah-bZVQyaCaKNzBmsPCbSdS3I5_0UUsYZjmiJhSSZFI4bR2UoqxqsfqkLUrKQPCRZJOp4_yDPflbMU")' }}
                    />
                    <button
                        className="absolute bottom-2 right-2 p-2.5 bg-primary-dashboard hover:scale-110 active:scale-95 text-surface-dashboard-dark rounded-full shadow-lg transition-all duration-200"
                        title="Change Avatar"
                    >
                        <Camera className="w-5 h-5 font-bold" />
                    </button>
                </div>

                {/* Info Section */}
                <div className="flex flex-1 flex-col gap-2 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                        <div>
                            <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Alex Mercer</h1>
                            <p className="text-primary-dashboard text-lg font-medium mt-1">3rd Year Medical Student</p>
                        </div>
                        <Button variant="outline" className="hidden md:flex items-center gap-2 border-primary-dashboard/30 text-primary-dashboard hover:bg-primary-dashboard/10 font-bold">
                            <Edit3 className="w-4 h-4" />
                            <span>Edit Public Bio</span>
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 mt-3 text-sm text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark font-medium">
                        <div className="flex items-center gap-2 group cursor-default">
                            <GraduationCap className="w-5 h-5 text-primary-dashboard" />
                            <span className="text-slate-700 dark:text-gray-300">Stanford Medicine</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-default">
                            <div className="bg-primary-dashboard/10 text-primary-dashboard px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                                <Stethoscope className="w-3.5 h-3.5" />
                                Rotation: Cardiology
                            </div>
                        </div>
                        <div className="flex items-center gap-2 group cursor-default">
                            <MapPin className="w-5 h-5 text-primary-dashboard" />
                            <span className="text-slate-700 dark:text-gray-300">Palo Alto, CA</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
