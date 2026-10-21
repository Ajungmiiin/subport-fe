import { Link, useNavigate } from 'react-router-dom';
import Informationicon from '@/assets/icons/information-icon.svg?react';

import { Button } from '../../../../components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '../../../../components/ui/drawer';

import { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../../components/ui/tooltip';
import useGetPlanList from '@/domains/subscription/plans/hooks/queries/use-get-plan-list';
import { Loader2, Plus } from 'lucide-react';
import PlanSelectionList from './plan-selection-list';
import type { PlanSelectionItem } from '../types/view';

interface PlanListBottomModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selectPlan: PlanSelectionItem) => void;
  defaultValue?: string;
  serviceId: string;
}

function PlanListBottomModal({
  open,
  onClose,
  onSelect,
  defaultValue,
  serviceId,
}: PlanListBottomModalProps) {
  const { data: plans, isPending: isGetPlansPending } =
    useGetPlanList(serviceId);

  const navigate = useNavigate();
  const [openDrawer, setOpenDarwer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanSelectionItem>();

  const showUsdTooltip = selectedPlan?.amountUnit === 'USD';

  const handleSelectPlan = () => {
    if (!selectedPlan) {
      onClose();
      return;
    }
    onSelect(selectedPlan);
    onClose();
  };

  const handleOpenChange = () => {
    setSelectedPlan(undefined);
    onClose();
  };

  if (isGetPlansPending || !plans) return null;

  return (
    <>
      <Drawer open={open} onOpenChange={handleOpenChange}>
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
                {plans!.planUrl && (
                  <Link
                    to={plans!.planUrl}
                    target="_blank"
                    className="text-background-black flex items-center rounded-full bg-[#E9ECEF] px-2 py-1.5 text-xs font-bold"
                  >
                    살펴보기
                  </Link>
                )}
              </div>
              <button
                type="button"
                onClick={() => navigate(`/service/${serviceId}/plan/edit`)}
                className="bg-box-black block cursor-pointer rounded-full px-5 py-1.5 text-xs"
              >
                관리
              </button>
            </div>
          </DrawerTitle>

          <div className="scrollbar-hide overflow-scroll pb-4">
            {isGetPlansPending && (
              <div className="bg-box-black mb-4 flex h-32 w-full animate-pulse items-center justify-center rounded-2xl">
                <Loader2 className="animate-spin" />
              </div>
            )}

            {!isGetPlansPending && plans && plans.plans.length > 0 ? (
              <PlanSelectionList
                plans={plans.plans}
                value={selectedPlan?.id.toString() || defaultValue}
                serviceId={serviceId}
                onSelect={(selectedPlan) => {
                  setSelectedPlan(selectedPlan);
                }}
              />
            ) : (
              <Link
                to={`/service/${serviceId}/plan/add`}
                className="hover:bg-box-black/80 bg-box-black flex h-32 w-full items-center justify-center rounded-2xl transition-colors"
              >
                <Plus className="size-10" strokeWidth={2} />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4 pt-5">
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
