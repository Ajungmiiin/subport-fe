import PageTitle from '@/components/ui/page-title';
import EditAccountForm from './components/edit-account-form';

function EditAccountPage() {
  return (
    <div className="flex h-full flex-col">
      <PageTitle>
        정보를 <br />
        입력해주세요
      </PageTitle>

      <EditAccountForm />
    </div>
  );
}

export default EditAccountPage;
