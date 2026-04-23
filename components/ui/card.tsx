import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-technical/80 bg-technical/35 p-6 shadow-premium backdrop-blur-sm',
        className
      )}
      {...props}
    />
  );
}
