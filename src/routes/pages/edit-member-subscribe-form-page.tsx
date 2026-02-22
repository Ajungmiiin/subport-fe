import EditMemberSubscribeDutchPayForm from '@/components/subscribe/member-subscribe/edit-member-subscribe-dutchpay-form';
import EditMemberSubscribePlanForm from '@/components/subscribe/member-subscribe/edit-member-subscribe-plan-form';
import EditMemberSubscribeStateForm from '@/components/subscribe/member-subscribe/edit-member-subscribe-state-form';
import useGetMemberSubscribeById from '@/hooks/queries/use-get-member-subscribe-by-id';
import { useParams } from 'react-router-dom';

function EditMemberSubscribeFormPage() {
  const { memberSubscribeId, editSection } = useParams();

  const { data: subscribe, isPending: isGetMemberSubscribePending } =
    useGetMemberSubscribeById(memberSubscribeId!);

  if (isGetMemberSubscribePending) return <p>Loading</p>;
  if (!subscribe) return <p>데이터 없음</p>;

  return (
    <>
      {editSection === 'dutchpay' && (
        <EditMemberSubscribeDutchPayForm
          defaultAmount={
            subscribe.dutchPay ? subscribe.actualPayment.toString() : '0'
          }
        />
      )}

      {editSection === 'plan' && (
        <EditMemberSubscribePlanForm
          subscribeId={subscribe.subscriptionId.toString()}
          prevPlanId={subscribe.planId.toString()}
        />
      )}

      {editSection === 'state' && <EditMemberSubscribeStateForm />}
    </>
  );
}

export default EditMemberSubscribeFormPage;
