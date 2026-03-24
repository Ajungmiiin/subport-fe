import * as React from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  containerClassName?: string;
  textareaClassName?: string;
  maxLength?: number;
  showCount?: boolean;
};

function Textarea({
  className,
  containerClassName,
  textareaClassName,
  value,
  maxLength = 300,
  showCount = true,
  ...props
}: TextareaProps) {
  const currentLength = String(value ?? '').length;

  return (
    <div
      className={cn(
        'bg-box-black relative flex h-30 flex-col gap-1 overflow-hidden rounded-lg p-4 pb-2',
        containerClassName,
      )}
    >
      <textarea
        className={cn(
          'bg-box-black placeholder:text-sub-font-black h-full w-full resize-none text-sm outline-none placeholder:text-sm',
          className,
          textareaClassName,
        )}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      {showCount && (
        <div className="text-right text-xs font-light">{`${currentLength}/${maxLength}`}</div>
      )}
    </div>
  );
}

export { Textarea };
