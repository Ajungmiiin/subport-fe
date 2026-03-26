import { useEffect, useRef, type ReactNode } from 'react';

function PickerScrollGuard({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const blockScroll = (event: TouchEvent | WheelEvent) => {
      if (event.cancelable) {
        event.preventDefault();
      }

      event.stopPropagation();
    };

    element.addEventListener('touchmove', blockScroll, { passive: false });
    element.addEventListener('wheel', blockScroll, { passive: false });

    return () => {
      element.removeEventListener('touchmove', blockScroll);
      element.removeEventListener('wheel', blockScroll);
    };
  }, [enabled]);

  return (
    <div ref={ref} style={{ overscrollBehavior: 'contain' }}>
      {children}
    </div>
  );
}

export default PickerScrollGuard;
