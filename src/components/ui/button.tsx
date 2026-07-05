import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, children, ...props }: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    const childClassName = (children.props as { className?: string }).className;
    return React.cloneElement(children, {
      className: cn(buttonVariants({ variant, size, className }), childClassName),
      ...props,
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
