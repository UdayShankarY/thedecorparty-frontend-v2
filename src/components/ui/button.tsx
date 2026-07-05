import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        // Primary — violet, 44px, rounded-xl, shadow, hover lift, active scale
        primary:
          "h-11 rounded-xl bg-violet-600 px-5 text-sm text-white shadow-sm shadow-violet-200 hover:bg-violet-700 hover:-translate-y-px active:scale-[0.97] active:translate-y-0",
        // Secondary — white bg, gray border, dark text
        secondary:
          "h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm text-slate-800 hover:bg-slate-50 active:scale-[0.97]",
        // Ghost — transparent, violet text, no border
        ghost:
          "h-9 rounded-lg bg-transparent px-3 text-sm text-violet-600 hover:bg-violet-50 active:scale-[0.97]",
        // Icon — 44×44 touch target, rounded-full, hover bg
        icon:
          "h-11 w-11 rounded-full bg-transparent p-0 text-slate-600 hover:bg-slate-100 active:scale-[0.93]",
        // default kept as alias for primary — prevents breaking existing usages
        default:
          "h-11 rounded-xl bg-violet-600 px-5 text-sm text-white shadow-sm shadow-violet-200 hover:bg-violet-700 hover:-translate-y-px active:scale-[0.97] active:translate-y-0",
        // outline kept for any remaining usages
        outline:
          "h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm text-slate-800 hover:bg-slate-50 active:scale-[0.97]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    const childClassName = (children.props as { className?: string }).className;
    return React.cloneElement(children, {
      className: cn(buttonVariants({ variant, className }), childClassName),
      ...props,
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
