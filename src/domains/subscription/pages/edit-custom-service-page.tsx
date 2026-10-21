import PageTitle from '@/components/ui/page-title';
import CustomServicesForm from '@/domains/subscription/services/components/custom-services-form';
import useUpdateCustomServiceMutate from '@/domains/subscription/services/hooks/mutate/use-update-custom-service-mutate';
import useGetServiceById from '@/domains/subscription/services/hooks/queries/use-get-service-by-id';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import type { AddCustomServicesReq } from '../services/schemas/custom-services-schema';

function EditCustomServicePage() {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const { mutate: updateCustomService, isPending: isUpdatedCustomService } =
    useUpdateCustomServiceMutate({
      onSuccess: () => {
        toast.success('수정되었어요', {
          position: 'bottom-center',
        });

        navigate(-1);
      },
    });
  const { data: service, isPending: isGetServicePending } = useGetServiceById(
    serviceId!,
  );

  const onSubmit = (formData: AddCustomServicesReq) => {
    updateCustomService({
      serviceId: serviceId!.toString(),
      serviceInfo: formData,
    });
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <PageTitle>
        구독 서비스 정보를 <br /> 입력해주세요
      </PageTitle>

      {isGetServicePending ? (
        <>
          <div className="flex h-full flex-1 flex-col justify-between">
            <div>
              <div className="bg-box-black mb-4 aspect-square size-25 animate-pulse rounded-xl"></div>
              <div className="bg-box-black mb-4 h-22.5 w-full animate-pulse rounded-xl"></div>
              <div className="bg-box-black h-22.5 w-full animate-pulse rounded-xl"></div>
            </div>
            <div className="bg-box-black h-15 w-full animate-pulse rounded-xl"></div>
          </div>
        </>
      ) : (
        <CustomServicesForm
          defaultValues={service}
          onSubmit={onSubmit}
          disabled={isUpdatedCustomService}
        />
      )}
    </div>
  );
}

export default EditCustomServicePage;
