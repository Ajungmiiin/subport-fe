import EditUserSubscriptionDutchPayForm from '@/domains/subscription/user-subscription/components/edit/edit-user-subscription-dutchpay-form';
import PageTitle from '@/components/ui/page-title';
import { useOutletContext } from 'react-router-dom';
import type { UserSubscriptionByIdItem } from '../types/api';

function EditUserSubscriptionDutchPayPage() {
  const { userSubscription } = useOutletContext<{
    userSubscription: UserSubscriptionByIdItem;
  }>();

  return (
    <section className="flex h-full flex-col justify-between">
      <PageTitle>
        더치페이 금액을 <br /> 입력해 주세요
      </PageTitle>

      <EditUserSubscriptionDutchPayForm
        defaultDutchPay={userSubscription.dutchPay}
        defaultAmount={
          userSubscription.dutchPay
            ? userSubscription.actualPayment.toString()
            : '0'
        }
      />
    </section>
  );
}

export default EditUserSubscriptionDutchPayPage;
