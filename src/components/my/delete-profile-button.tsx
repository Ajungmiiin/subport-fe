import QuitIcon from '@/assets/icons/quit-icon.svg';
import useDeleteProfileMutate from '@/hooks/mutations/use-delete-profile-mutate';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

function DeleteProfileButton() {
  const navigate = useNavigate();
  const { mutate: deleteProfile } = useDeleteProfileMutate({
    onSuccess: () => {
      navigate('/');
    },
  });

  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <img className="size-8" src={QuitIcon} alt="계정 탈퇴" />
          <div className="flex flex-col justify-between text-sm">
            <span className="text-start font-semibold">계정 탈퇴</span>
            <span className="text-sub-font-black text-xs">
              계정을 탈퇴하고 모든 데이터를 삭제해요
            </span>
          </div>
        </div>
        <ChevronRight />
      </button>

      {modal && (
        <Dialog
          open={modal}
          onOpenChange={() => {
            setModal(false);
            setConfirm(false);
          }}
        >
          <DialogContent className="bg-background-black rounded-2xl border-none">
            <DialogHeader>
              <DialogTitle className="pt-4 text-center text-white">
                계정을 탈퇴하시겠어요?
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sub-font-black text-center">
              탈퇴 시 계정 정보와 저장된 내용은 모두 삭제되며,
              <br /> 복구할 수 없습니다.
            </DialogDescription>

            <div className="flex items-center justify-center gap-2">
              <Checkbox
                id="confirm"
                checked={confirm}
                onCheckedChange={() => setConfirm((prev) => !prev)}
              />
              <label
                className="text-sub-font-black cursor-pointer text-sm"
                htmlFor="confirm"
              >
                탈퇴 안내를 모두 확인했어요
              </label>
            </div>

            <DialogFooter>
              <Button
                onClick={() => deleteProfile}
                disabled={!confirm}
                className="bg-primary-light-active h-12 w-full rounded-xl"
              >
                탈퇴하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default DeleteProfileButton;
