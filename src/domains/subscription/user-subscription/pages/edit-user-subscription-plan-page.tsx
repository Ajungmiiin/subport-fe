import { Link, useOutletContext } from 'react-router-dom';
import type { UserSubscriptionByIdItem } from '../types/api';
import PageTitle from '@/components/ui/page-title';
import EditUserSubscriptionPlanForm from '../components/edit/edit-user-subscription-plan-form';

function EditUserSubscriptionPlanPage() {
  const { userSubscription } = useOutletContext<{
    userSubscription: UserSubscriptionByIdItem;
  }>();

  return (
    <section className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <PageTitle>
            멤버십 종류를 <br /> 선택해주세요
          </PageTitle>
          <Link
            to={`manage/${userSubscription.subscriptionId}`}
            className="bg-box-black rounded-full px-5 py-2 text-xs"
          >
            관리
          </Link>
        </div>
      </div>
      <EditUserSubscriptionPlanForm
        subscribeId={userSubscription.subscriptionId.toString()}
        prevPlanId={userSubscription.planId.toString()}
      />
    </section>
  );
}

export default EditUserSubscriptionPlanPage;
