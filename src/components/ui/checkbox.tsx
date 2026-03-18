import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import CheckIcon from '@/assets/icons/check-icon.svg?react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
  ' cursor-pointer dark:bg-input/30  data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  shadow-xs  outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 ',
  {
    variants: {
      variant: {
        primary:
          'data-[state=checked]:border-background-black data-[state=checked]:bg-primary-light-active flex size-6 items-center justify-center rounded-full border-2 border-[#444444]',
        secondary:
          'bg-background-black rounded-2xl data-[state=checked]:bg-primary px-7 py-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

function Checkbox({
  className,
  variant = 'primary',
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'data-[state=checked]:[&>svg]:stroke-background-black transition-colors [&>svg]:stroke-[#444444]',
        checkboxVariants({ variant, className }),
      )}
      {...props}
    >
      <CheckIcon
        className={cn(
          'transition-colors',
          variant === 'primary' ? 'size-2' : 'size-4',
        )}
      />
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
