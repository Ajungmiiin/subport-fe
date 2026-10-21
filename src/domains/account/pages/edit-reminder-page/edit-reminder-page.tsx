import PageTitle from '@/components/ui/page-title';
import EditReminderForm from './components/edit-reminder-form';

function EditReminderPage() {
  return (
    <div className="flex h-full flex-col">
      <PageTitle>
        이메일 알림을 <br />
        설정해 주세요
      </PageTitle>

      <EditReminderForm />
    </div>
  );
}

export default EditReminderPage;
