import { Link } from 'react-router-dom';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../../components/ui/radio-group';
import { cn } from '@/shared/lib/utils';
import type { PlanItem } from '@/domains/subscription/plans/types/api';
import { Plus } from 'lucide-react';
import type { PlanSelectionItem } from '../types/view';

type PlanSelectionListProps = {
  serviceId: string;
  value?: string;
  onSelect: (selectPlan: PlanSelectionItem) => void;
  plans: PlanItem[];
};

function PlanSelectionList({
  serviceId,
  value,
  onSelect,
  plans,
}: PlanSelectionListProps) {
  const handleValueChange = (value: string) => {
    const selectedPlan = plans.find((plan) => plan.id.toString() === value);
    if (!selectedPlan) return;

    onSelect({
      amountUnit: selectedPlan.amountUnit,
      id: selectedPlan.id,
      name: selectedPlan.name,
      price: selectedPlan.amount,
    });
  };

  return (
    <div className="scrollbar-hide space-y-4 overflow-y-scroll">
      {plans.length > 0 && (
        <>
          <RadioGroup value={value}>
            {plans.map((plan) => (
              <div
                onClick={() => handleValueChange(plan.id.toString())}
                key={plan.id}
                className="bg-box-black hover:bg-box-black/80 flex cursor-pointer items-center justify-between rounded-2xl px-5 py-4 transition-colors"
              >
                <div>
                  <p className={cn('mb-2 text-lg font-semibold')}>
                    {plan.name}
                  </p>
                  <span className="text-sub-font-black text-sm">
                    {`${plan.durationMonths > 1 ? `${plan.durationMonths}개월` : '월'} ${Number(plan.amount).toLocaleString()}${plan.amountUnit === 'KRW' ? '₩' : '$'}`}
                  </span>
                </div>

                <RadioGroupItem value={plan.id.toString()} />
              </div>
            ))}
          </RadioGroup>
          <Link
            to={`/service/${serviceId}/plan/add`}
            className="hover:bg-box-black/80 bg-box-black flex h-32 w-full items-center justify-center rounded-2xl transition-colors"
          >
            <Plus className="size-10" strokeWidth={2} />
          </Link>
        </>
      )}
    </div>
  );
}

export default PlanSelectionList;
