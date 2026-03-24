import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import CheckIcon from '@/assets/icons/check-icon.svg?react';

import { cn } from '@/lib/utils';

type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
> & {
  variant?: 'dot' | 'check';
};

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  variant = 'check',
  className,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item disabled:opacity-50 focus-visible:border-ring "
      className={cn(
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 dark:bg-input/30 disabled:cursor-not-allowed',
        variant === 'dot' &&
          'data-[state=unchekced]:[&>svg]:stroke-box-black data-[state=checked]:[&>svg]:stroke-primary data-checked:text-primary-foreground bg-box-black dark:/50 group/radio-group-item peer relative flex aspect-square size-5.5 shrink-0 items-center justify-center rounded-full outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 aria-invalid:ring-3',
        variant === 'check' &&
          'data-[state=checked]:[&>svg]:stroke-background-black bg-background-black data-[state=checked]:bg-primary text-primary inline-flex cursor-pointer items-center justify-center rounded-xl px-5.5 py-10 shadow-xs transition-colors outline-none focus-visible:ring-[3px] [&>svg]:stroke-[#444444]',
        className,
      )}
      {...props}
    >
      {variant === 'dot' && (
        <CheckIcon
          strokeWidth={100}
          className={cn('size-2.5 transition-colors')}
        />
      )}
      {variant === 'check' && <CheckIcon className="size-4" />}
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
