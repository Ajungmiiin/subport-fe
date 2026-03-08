import AddCustomSubscribeForm from '@/components/subscribe/add-custom-subscribe-form';

import useAddCustomSubscribeMutate from '@/hooks/mutations/use-add-custom-subscribe-mutate';
import type { AddCustomSubscribeReq } from '@/types/subscribe';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function AddCustomSubscribePage() {
  const navigate = useNavigate();
  const { mutate: addCustomSubscribe, isPending: isAddCustomSubscribePending } =
    useAddCustomSubscribeMutate({
      onSuccess: () => {
        navigate(-1);
        toast.success('구독 서비스가 생성되었습니다', {
          position: 'bottom-center',
        });
      },
    });

  const onSubmit = (formData: AddCustomSubscribeReq) => {
    addCustomSubscribe({
      defaultImageName: formData.defaultImageName,
      name: formData.name,
      type: formData.type,
      image: formData.defaultImageName ? null : formData.image,
    });
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        구독 서비스를 추가하시겠어요?
      </p>

      <AddCustomSubscribeForm
        onSubmit={onSubmit}
        disabled={isAddCustomSubscribePending}
      />
    </div>
  );
}

export default AddCustomSubscribePage;
