import { InfoIcon, Loader2Icon, TriangleAlertIcon } from 'lucide-react';

import ToastSuccessIcon from '@/assets/icons/toast-success-icon.svg?react';
import ToastErrorIcon from '@/assets/icons/toast-error-icon.svg?react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      offset={{ bottom: 16 }}
      duration={1500}
      mobileOffset={{ bottom: 16, left: 24, right: 24 }}
      toastOptions={{
        style: {
          pointerEvents: 'none',
          fontSize: '16px',
        },
        classNames: {
          toast: 'font-sans !flex !items-center !gap-2',
        },
      }}
      icons={{
        success: <ToastSuccessIcon className="size-6" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <ToastErrorIcon className="size-6" />,
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
