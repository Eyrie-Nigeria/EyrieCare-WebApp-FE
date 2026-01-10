import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-text-dashboard-secondary-dark/60 group-focus-within:text-primary-dashboard transition-colors duration-200 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-slate-200 dark:border-card-dashboard-dark bg-slate-50/50 dark:bg-background-dashboard-dark px-4 py-2 text-base text-slate-900 dark:text-white transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 dark:placeholder:text-text-dashboard-secondary-dark/40 focus:outline-none focus:ring-2 focus:ring-primary-dashboard/10 focus:border-primary-dashboard disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-12",
            rightIcon && "pr-12",
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-text-dashboard-secondary-dark/60 group-focus-within:text-primary-dashboard transition-colors duration-200">
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
