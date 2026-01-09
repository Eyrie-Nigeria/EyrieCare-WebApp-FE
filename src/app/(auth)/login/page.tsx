'use client';

import { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import AuthTabs from '@/components/auth/AuthTabs';
import SocialLogins from '@/components/auth/SocialLogins';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center sm:text-left">
                <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-500 dark:text-text-auth-light-green text-base">
                    Please enter your details to sign in.
                </p>
            </div>

            <AuthTabs />

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-1.5">
                    <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            className="w-full rounded-xl border border-gray-200 dark:border-border-auth-green bg-white dark:bg-surface-auth-dark px-4 py-3.5 text-base text-text-main dark:text-white placeholder-gray-400 dark:placeholder-text-auth-light-green/40 focus:border-primary-auth focus:ring-1 focus:ring-primary-auth transition-colors outline-none"
                            placeholder="student@medschool.edu"
                            type="email"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-auth-light-green w-5 h-5 pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-xs font-bold text-primary-auth hover:text-primary-auth-hover transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            className="w-full rounded-xl border border-gray-200 dark:border-border-auth-green bg-white dark:bg-surface-auth-dark px-4 py-3.5 text-base text-text-main dark:text-white placeholder-gray-400 dark:placeholder-text-auth-light-green/40 focus:border-primary-auth focus:ring-1 focus:ring-primary-auth transition-colors outline-none pr-12"
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                        />
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-auth-light-green hover:text-text-main dark:hover:text-white transition-colors"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button className="mt-2 w-full rounded-xl bg-primary-auth hover:bg-primary-auth-hover text-background-auth-deep font-bold py-3.5 text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,238,121,0.25)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.35)] active:scale-[0.98]">
                    Login
                </button>
            </form>

            <SocialLogins />

            <div className="text-center mt-2">
                <p className="text-sm text-gray-500 dark:text-text-auth-light-green">
                    Don't have an account?
                    <Link href="/signup" className="font-bold text-primary-auth hover:text-primary-auth-hover transition-colors mx-1">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
