import FeedbackRequestMascot from '@/assets/feedback-request-mascot.png';
import CloseIcon from '@/assets/icons/close-button-icon.svg?react';
import { STORAGE_KEY } from '@/constants/storage-key';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface FeedbackEntryBottomModalProps {
  open: boolean;
  onOpenChange: () => void;
}

const TODAY_DATE = new Date().toLocaleDateString('sv-SE');

function FeedbackEntryBottomModal({
  open,
  onOpenChange,
}: FeedbackEntryBottomModalProps) {
  const navigate = useNavigate();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background-black data-[vaul-drawer-direction=bottom]:rounded-t-[30px]">
        <DrawerHeader className="mb-2 p-0">
          <div className="text-right">
            <CloseIcon
              className="inline size-6 cursor-pointer"
              onClick={onOpenChange}
            />
          </div>
          <DrawerTitle className="text-xl text-white">
            섭포트에 대한 의견을 들려주세요!
          </DrawerTitle>
        </DrawerHeader>

        <DrawerDescription className="text-sub-font-black text-center">
          간단한 설문으로 서비스 개선에 참여해보세요
        </DrawerDescription>

        <img
          src={FeedbackRequestMascot}
          alt="섭포트 마스코트 캐릭터"
          className="mx-auto my-10 h-auto w-30"
        />

        <DrawerFooter className="space-y-1 p-0">
          <Button
            onClick={() => {
              onOpenChange();
              navigate('/feedback');
            }}
            className="bg-primary-light-active hover:bg-primary-light-hover rounded-xl py-3.5"
          >
            피드백 하기
          </Button>

          <button
            onClick={() => {
              localStorage.setItem(
                STORAGE_KEY.feedbackEntryHiddenUntil,
                TODAY_DATE,
              );
              onOpenChange();
            }}
            className="text-sub-font-black w-full cursor-pointer text-xs"
            type="button"
          >
            오늘 하루 보지 않기
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default FeedbackEntryBottomModal;
