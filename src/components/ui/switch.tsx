import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

type SwitchVariant = 'label-pill' | 'dot';

type Props = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  variant?: SwitchVariant;
  onLabel?: string;
  offLabel?: string;
};

const size = {
  'label-pill': { w: '130px', h: '45px', pad: '4px', thumb: '72px' },
  dot: { w: '80px', h: '38px', pad: '4px', thumb: '30px' },
} as const;

export function Switch({
  variant = 'label-pill',
  onLabel = 'ON',
  offLabel = 'OFF',
  className,
  ...props
}: Props) {
  const s = size[variant];

  return (
    <SwitchPrimitive.Root
      {...props}
      style={
        {
          '--w': s.w,
          '--h': s.h,
          '--pad': s.pad,
          '--thumb': s.thumb,
        } as React.CSSProperties
      }
      className={cn(
        'group relative inline-flex h-(--h) w-(--w) cursor-pointer items-center overflow-hidden rounded-full p-(--pad) transition-colors',
        variant === 'label-pill'
          ? 'bg-box-black'
          : 'data-[state=checked]:bg-[#eaf4f2] data-[state=unchecked]:bg-[#242429]',
        className,
      )}
    >
      {variant === 'dot' && (
        <>
          <span className="pointer-events-none absolute left-4 text-sm font-semibold text-black opacity-0 group-data-[state=checked]:opacity-100">
            {onLabel}
          </span>
          <span className="pointer-events-none absolute right-3 text-sm font-semibold opacity-100 group-data-[state=checked]:opacity-0">
            {offLabel}
          </span>
        </>
      )}

      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none absolute top-(--pad) left-(--pad) rounded-full transition-[left] duration-200',
          'text-sm text-black',
          variant === 'label-pill'
            ? 'h-[calc(var(--h)-var(--pad)*2)] w-(--thumb) bg-white data-[state=checked]:left-[calc(100%-var(--thumb)-var(--pad))] data-[state=checked]:bg-[#d9f5f0] data-[state=unchecked]:left-(--pad)'
            : 'h-(--thumb) w-(--thumb) bg-[#69cec2] data-[state=checked]:left-[calc(var(--w)-var(--thumb)-var(--pad))]',
        )}
      >
        {variant === 'label-pill' && (
          <>
            <span className="absolute inset-0 grid place-items-center font-semibold opacity-100 group-data-[state=checked]:opacity-0">
              {offLabel}
            </span>
            <span className="absolute inset-0 grid place-items-center font-semibold opacity-0 group-data-[state=checked]:opacity-100">
              {onLabel}
            </span>
          </>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
