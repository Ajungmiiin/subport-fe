import { cn } from '@/lib/utils';

function SpendingStateDot({ state }: { state: 'complete' | 'ongoing' }) {
  return (
    <span
      className={cn(
        'size-1.5 rounded-full',
        state === 'complete' ? 'bg-primary' : 'bg-white',
      )}
    />
  );
}

export default SpendingStateDot;
