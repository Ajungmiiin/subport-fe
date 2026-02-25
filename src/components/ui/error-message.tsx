import ErrorIcon from '@/assets/icons/error-icon.svg?react';

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-2">
      <ErrorIcon />
      <span>{message}</span>
    </p>
  );
}

export default ErrorMessage;
