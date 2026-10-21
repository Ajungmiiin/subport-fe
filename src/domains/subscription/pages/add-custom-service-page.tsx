import CustomServicesForm from '@/domains/subscription/services/components/custom-services-form';
import PageTitle from '@/components/ui/page-title';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAddCustomServiceMutate from '@/domains/subscription/services/hooks/mutate/use-add-custom-service-mutate';
import type { AddCustomServicesReq } from '../services/schemas/custom-services-schema';

function AddCustomServicesPage() {
  const navigate = useNavigate();
  const { mutate: addCustomServices, isPending: isAddCustomServicesPending } =
    useAddCustomServiceMutate({
      onSuccess: () => {
        navigate(-1);
        toast.success('구독 서비스가 생성되었습니다', {
          position: 'bottom-center',
        });
      },
    });

  const onSubmit = (formData: AddCustomServicesReq) => {
    addCustomServices({
      defaultImageName: formData.defaultImageName,
      name: formData.name,
      type: formData.type,
      image: formData.defaultImageName ? null : formData.image,
    });
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <PageTitle>
        구독 서비스를 <br /> 추가하시겠어요?
      </PageTitle>

      <CustomServicesForm
        onSubmit={onSubmit}
        disabled={isAddCustomServicesPending}
      />
    </div>
  );
}

export default AddCustomServicesPage;
