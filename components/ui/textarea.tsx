import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'min-h-28 w-full rounded-md border border-technical bg-black/50 px-3 py-3 text-sm text-foreground placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
