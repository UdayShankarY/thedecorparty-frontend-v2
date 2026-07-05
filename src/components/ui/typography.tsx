import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return <h1 className={cn('text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl', className)}>{children}</h1>;
}

export function H2({ children, className }: TypographyProps) {
  return <h2 className={cn('text-2xl font-semibold tracking-tight text-slate-900', className)}>{children}</h2>;
}

export function P({ children, className }: TypographyProps) {
  return <p className={cn('text-base leading-7 text-slate-600', className)}>{children}</p>;
}