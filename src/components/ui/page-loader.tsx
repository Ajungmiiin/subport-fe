import { cn } from '@/shared/lib/utils';
import { Spinner } from './spinner';

type PageLoaderProps = React.ComponentProps<'div'> & {
  label?: string;
  fullHeight?: boolean;
};

function PageLoader({
  className,
  label = '로딩 중...',
  fullHeight = true,
  ...props
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-center',
        fullHeight && 'h-full flex-1',
        className,
      )}
      {...props}
    >
      <Spinner className="text-primary size-8" />
      <p className="text-sub-font-black text-sm">{label}</p>
    </div>
  );
}

export default PageLoader;
