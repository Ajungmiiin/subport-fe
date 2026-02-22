import { Link, useNavigate } from 'react-router-dom';
import Informationicon from '@/assets/icons/information-icon.svg?react';

import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerTitle } from '../ui/drawer';

import { useState } from 'react';
import type { PlanType } from '../subscribe/add-subscribe-form';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import PlanSelector from '../plan/plan-selector';

interface PlanListBottomModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectPlan: PlanType) => void;
  defaultValue?: string;
  id: string;
}

function PlanListBottomModal({
  open,
  onClose,
  onSelect,
  defaultValue,
  id,
}: PlanListBottomModalProps) {
  const navigate = useNavigate();
  const [openDrawer, setOpenDarwer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>();
  console.log('current selected plan', selectedPlan);
  const showUsdTooltip = selectedPlan?.amountUnit === 'USD';

  const handleSelectPlan = () => {
    if (!selectedPlan) {
      console.log('selectedPlan undefined');
      onClose();
      return;
    }

    console.log('selected Plan success');
    onSelect(selectedPlan);
    onClose();
  };

  const handleOpenChange = () => {
    onClose();
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent
          onAnimationEnd={() => {
            if (open) {
              setOpenDarwer(true);
            }
            if (!open) {
              setOpenDarwer(false);
            }
          }}
        >
          <DrawerTitle className="mb-4 px-4 py-2 text-xl font-semibold text-white">
            <div className="flex items-center justify-between">
              <Tooltip open={open && openDrawer && showUsdTooltip}>
                <TooltipTrigger asChild>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute top-1 left-1/2 size-0 -translate-x-1/2 bg-white"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  sideOffset={10}
                  avoidCollisions={false}
                  className="bg-primary text-background-black flex items-center gap-1"
                >
                  <Informationicon />
                  <span>
                    환율 및 카드사 수수료에 따라 매달 결제 금액이 달라집니다
                  </span>
                </TooltipContent>
              </Tooltip>
              <div className="items-cetner flex gap-2">
                <span className="text-xl">멤버십 종류</span>
                <Link
                  to="/subscribe/add"
                  target="_blank"
                  className="text-background-black flex items-center rounded-full bg-[#E9ECEF] px-2 py-1.5 text-xs font-bold"
                >
                  살펴보기
                </Link>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/subscribe/${id}/plan/edit`)}
                className="bg-box-black block cursor-pointer rounded-full px-5 py-1.5 text-xs"
              >
                관리
              </button>
            </div>
          </DrawerTitle>

          <div className="scrollbar-hide overflow-scroll pb-4">
            <PlanSelector
              defaultValue={defaultValue}
              subscribeId={id!}
              onSelect={(selectedPlan) => setSelectedPlan(selectedPlan)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleOpenChange}
              className="w-[30%]"
            >
              닫기
            </Button>
            <Button
              onClick={handleSelectPlan}
              type="button"
              className="w-[65%]"
            >
              저장하기
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default PlanListBottomModal;
