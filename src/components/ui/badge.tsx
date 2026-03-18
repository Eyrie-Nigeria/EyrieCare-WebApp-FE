import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-dashboard text-white dark:text-surface-dashboard-dark hover:bg-primary-dashboard/90",
        secondary:
          "border-transparent bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10",
        destructive:
          "border-transparent bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20",
        outline:
          "text-foreground border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5",
        eyrie:
          "bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/20 hover:bg-primary-dashboard/20",
        success:
          "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20",
        warning:
          "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
