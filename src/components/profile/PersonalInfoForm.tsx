"use client";

import {
  Mail,
  Phone,
  Lock,
  ChevronRight,
  PlusCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PersonalInfoForm() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Personal Details Card */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">
            Personal Details
          </h3>
          <button className="text-primary-dashboard text-sm font-bold hover:underline transition-all">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              First Name
            </label>
            <Input
              type="text"
              defaultValue="Alex"
              leftIcon={<User className="w-5 h-5" />}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              Last Name
            </label>
            <Input
              type="text"
              defaultValue="Mercer"
              leftIcon={<User className="w-5 h-5" />}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              Email Address
            </label>
            <Input
              type="email"
              defaultValue="alex.mercer@med.edu"
              leftIcon={<Mail className="w-5 h-5" />}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              Phone Number
            </label>
            <Input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              leftIcon={<Phone className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>

      {/* Academic Info Card */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6">
          Academic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              Student ID
            </label>
            <div className="relative">
              <Input
                disabled
                type="text"
                defaultValue="MED-2024-8921"
                className="bg-slate-50 dark:bg-background-dashboard-dark/50 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            </div>
            <p className="text-[10px] text-text-dashboard-secondary-light mt-1 pl-1">
              Cannot be changed
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              Expected Graduation
            </label>
            <Input type="text" defaultValue="May 2026" />
          </div>
          <div className="md:col-span-2 p-4 rounded-xl border border-dashed border-primary-dashboard/30 bg-primary-dashboard/5 flex items-center justify-between group cursor-pointer hover:bg-primary-dashboard/10 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary-dashboard/20 flex items-center justify-center text-primary-dashboard group-hover:bg-primary-dashboard group-hover:text-surface-dashboard-dark transition-all duration-300">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">
                  Add Specialty Interest
                </p>
                <p className="text-xs text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
                  Let mentors know what fields you are interested in
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-text-dashboard-secondary-light group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" className="px-8 font-bold">
          Discard
        </Button>
        <Button variant="dashboard" className="px-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
