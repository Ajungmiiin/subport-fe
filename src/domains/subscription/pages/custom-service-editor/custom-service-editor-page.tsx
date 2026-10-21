import { toast } from 'sonner';
import { useState } from 'react';
import ConfirmModal from '@/components/modal/confirm-modal';
import { getApiErrorMessage } from '@/shared/lib/error';
import useGetCustomSubscriptionServices from '../../services/hooks/queries/use-get-custom-subscription-serivces';
import CustomServiceEditCard from './components/custom-service-edit-card';
import { useNavigate } from 'react-router-dom';
import useDeleteCustomServiceMutate from '@/domains/subscription/services/hooks/mutate/use-delete-custom-service-mutate';

function SubscribeEditorPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [deleteSubscriptionServiceId, setDeleteSubscrpitionServiceId] =
    useState<number | null>(null);

  const {
    data: subscriptionServices,
    isPending: isGetSubscriptionServicesPending,
  } = useGetCustomSubscriptionServices();

  const { mutate: deleteCustomService } = useDeleteCustomServiceMutate({
    onSuccess: () => {
      toast.success('삭제되었습니다', {
        position: 'bottom-center',
      });
    },

    onError: (error) => {
      const errorMessage = getApiErrorMessage(error);
      toast.error(errorMessage, {
        position: 'bottom-center',
      });
    },
  });

  if (isGetSubscriptionServicesPending)
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-box-black h-38 w-full animate-pulse rounded-2xl p-5"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-background-black size-10 animate-pulse rounded-lg"></div>
              <div className="bg-background-black h-6 w-1/2 rounded-lg"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-background-black h-14 flex-1 animate-pulse rounded-xl"></div>
              <div className="bg-background-black h-14 flex-1 animate-pulse rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <>
      {subscriptionServices && subscriptionServices.length > 0 && (
        <>
          <ul className="flex flex-col gap-4">
            {subscriptionServices?.map((subscriptionService) => (
              <CustomServiceEditCard
                key={subscriptionService.id}
                subscriptionService={subscriptionService}
                onDelete={() => {
                  setModal(true);
                  setDeleteSubscrpitionServiceId(subscriptionService.id);
                }}
                onEdit={() => {
                  navigate(subscriptionService.id.toString());
                }}
              />
            ))}
          </ul>
        </>
      )}

      {!subscriptionServices ||
        (subscriptionServices.length <= 0 && (
          <p className="text-sub-font-black flex h-full flex-1 items-center justify-center">
            직접 등록한 구독 서비스가 존재하지 않습니다.
          </p>
        ))}

      <ConfirmModal
        open={modal}
        onOpenChange={() => {
          setModal(false);
          setDeleteSubscrpitionServiceId(null);
        }}
        cancelText="아니요"
        confirmText="네"
        onConfirm={() =>
          deleteCustomService(deleteSubscriptionServiceId!.toString())
        }
        title="정말 삭제하시겠어요?"
        description="이 구독 서비를 삭제하면 저장된 모든 구독 플랜이 함께 삭제됩니다."
      />
    </>
  );
}

export default SubscribeEditorPage;
