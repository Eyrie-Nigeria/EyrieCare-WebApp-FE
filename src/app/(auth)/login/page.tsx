'use client';

import { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import AuthTabs from '@/components/auth/AuthTabs';
import SocialLogins from '@/components/auth/SocialLogins';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
                    <Input
                        placeholder="student@medschool.edu"
                        type="email"
                        rightIcon={<Mail className="w-5 h-5 pointer-events-none" />}
                        className="dark:border-border-auth-green/30 dark:bg-surface-auth-dark"
                    />
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
                    <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="dark:border-border-auth-green/30 dark:bg-surface-auth-dark"
                        rightIcon={
                            <button
                                className="text-gray-400 dark:text-text-auth-light-green hover:text-text-main dark:hover:text-white transition-colors cursor-pointer"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        }
                    />
                </div>

                <Button
                    className="mt-2 w-full bg-primary-auth hover:bg-primary-auth-hover text-background-auth-deep font-bold py-7 py-3.5 text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,238,121,0.25)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.35)] active:scale-[0.98]"
                >
                    Login
                </Button>
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
