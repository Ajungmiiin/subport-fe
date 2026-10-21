import EditUserSubscriptionStateForm from '@/domains/subscription/user-subscription/components/edit/edit-user-subscription-state-form';
import PageTitle from '@/components/ui/page-title';

function EditUserSubscriptionStatePage() {
  return (
    <section className="flex h-full flex-col justify-between">
      <PageTitle>
        구독 상태를 <br />
        변경할까요?
      </PageTitle>

      <EditUserSubscriptionStateForm />
    </section>
  );
}

export default EditUserSubscriptionStatePage;
