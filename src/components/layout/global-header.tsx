import { useNavigate } from 'react-router-dom';
import BackButton from '@/assets/icons/back-button-icon.svg?react';

interface HeaderProps {
  title?: string;
  right?: React.ReactNode;
  backTo?: string;
}

function GlobalHeader({ title, right, backTo }: HeaderProps) {
  const navigate = useNavigate();
  console.log(backTo, title);
  return (
    <header className="relative flex w-full items-center justify-between py-4 pr-6 pl-2">
      <div className="w-10 justify-start">
        <button
          className="cursor-pointer p-2"
          onClick={() => {
            if (backTo) {
              navigate(backTo);
              return;
            }

            navigate(-1);
          }}
          aria-label="뒤로가기"
        >
          <BackButton className="size-6" />
        </button>
      </div>

      {title && (
        <h3 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold whitespace-nowrap">
          {title}
        </h3>
      )}

      {right && <div className="flex justify-end">{right}</div>}
    </header>
  );
}

export default GlobalHeader;
