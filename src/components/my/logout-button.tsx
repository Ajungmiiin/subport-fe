import { logout } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmModal from '../modal/confirm-modal';
import { useGetAuthActions, useGetAuthRole } from '@/store/use-auth-store';
import { STORAGE_KEY } from '@/constants/storage-key';

function LogoutButton({ children }: { children: React.ReactNode }) {
  const { clearAuth } = useGetAuthActions();
  const role = useGetAuthRole();

  const [modal, setModal] = useState(false);

  const { mutate: handleLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      location.reload();
    },
  });

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        {children}
      </button>

      <ConfirmModal
        cancelText="아니요"
        confirmText="네"
        description="로그아웃하고 다른 계정으로 로그인 하시겠어요?"
        onConfirm={() => {
          if (role === 'member') {
            handleLogout();
          }

          if (role === 'guest') {
            clearAuth();
            localStorage.removeItem(STORAGE_KEY.feedbackEntryHiddenUntil);
            localStorage.removeItem(STORAGE_KEY.feedbackSubmitted);
            location.reload();
          }
        }}
        onOpenChange={() => setModal(false)}
        open={modal}
        title="로그아웃 하시겠어요?"
      />
    </>
  );
}

export default LogoutButton;
