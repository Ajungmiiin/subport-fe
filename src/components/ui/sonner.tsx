import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      offset={{ bottom: 16 }}
      duration={1000}
      mobileOffset={{ bottom: 16, left: 24, right: 24 }}
      toastOptions={{
        style: {
          pointerEvents: 'none',
          fontSize: '16px',
        },
        classNames: {
          toast: 'font-sans',
        },
      }}
      icons={{
        success: (
          <CircleCheckIcon
            className="size-6"
            strokeWidth={2}
            stroke={'#ffffff'}
            fill={'#00B979'}
          />
        ),
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: (
          <CircleXIcon className="fill-d-day-color-7day size-6 stroke-white" />
        ),
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius-xl)',
          '--width': 'calc(min(100vw, 430px) - 3rem)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
