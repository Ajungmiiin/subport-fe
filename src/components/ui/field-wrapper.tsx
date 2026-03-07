import { cn } from '@/lib/utils';
import React from 'react';

interface FieldWrapperProps {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: boolean;
  className?: string;
}

function FieldWrapper({
  label,
  children,
  id,
  error = false,
  className,
}: FieldWrapperProps) {
  return (
    <div
      className={cn(
        error ? 'border-d-day-color-7day' : 'border-box-black',
        'bg-box-black flex flex-col items-start gap-2 rounded-xl border p-4.5 transition-all',
        className,
      )}
    >
      <label htmlFor={id} className="text-sub-font-black text-xs">
        {label}
      </label>
      {children}
    </div>
  );
}

export default FieldWrapper;
