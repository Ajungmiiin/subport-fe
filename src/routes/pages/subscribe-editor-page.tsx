import useGetSubscriptions from '@/hooks/queries/use-get-subscriptions';
import { Link } from 'react-router-dom';
import EditIcon from '@/assets/icons/edit-icon.svg?react';
import DeleteIcon from '@/assets/icons/delete-icon.svg?react';
import SubscribeFallbackImage from '@/assets/subscribe-fallback-image.svg';
import useDeleteCustomSubscribeMutate from '@/hooks/mutations/use-delete-custom-subscribe-mutate';
import { toast } from 'sonner';
import { useState } from 'react';
import ConfirmModal from '@/components/modal/confirm-modal';
function SubscribeEditorPage() {
  const [modal, setModal] = useState(false);
  const [deleteSubscribeId, setDeleteSubscribeId] = useState<number | null>(
    null,
  );
  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetSubscriptions();

  const { mutate: deleteSubscribe } = useDeleteCustomSubscribeMutate({
    onSuccess: () => {
      toast.success('삭제되었습니다', {
        position: 'bottom-center',
      });
    },

    onError: () => {
      console.log('error');
      toast.error('활성화 중인 구독은 삭제 할 수 없습니다', {
        position: 'bottom-center',
      });
    },
  });

  if (isGetSubscriptionsPending) return <p>불러오는 중</p>;

  const customSubscriptions = subscriptions?.filter(
    (subscribe) => subscribe.defaultProvided === false,
  );

  return (
    <>
      {customSubscriptions && customSubscriptions.length > 0 && (
        <>
          <ul className="flex flex-col gap-4">
            {customSubscriptions?.map((subscribe) => (
              <li key={subscribe.id}>
                <div className="bg-box-black flex flex-col gap-4 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="bg-background-black flex size-10 items-center justify-center rounded-lg p-2">
                      <img
                        src={subscribe.logoImageUrl || SubscribeFallbackImage}
                        className="inline-flex items-center justify-center object-contain"
                        alt={`${subscribe.name} 이미지`}
                      />
                    </div>
                    <p className="text-lg font-semibold">{subscribe.name}</p>
                  </div>

                  <div className="text-sub-font-black flex items-center gap-2">
                    <Link
                      to={`${subscribe.id}`}
                      className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
                    >
                      <span>수정하기</span>
                      <EditIcon className="fill-sub-font-black size-5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setModal(true);
                        setDeleteSubscribeId(subscribe.id);
                      }}
                      className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
                    >
                      <span>삭제하기</span>

                      <DeleteIcon className="fill-sub-font-black size-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {!customSubscriptions ||
        (customSubscriptions.length <= 0 && (
          <p className="text-sub-font-black flex h-full flex-1 items-center justify-center">
            등록한 멤버십이 존재하지 않습니다.
          </p>
        ))}

      <ConfirmModal
        open={modal}
        onOpenChange={() => {
          setModal(false);
          setDeleteSubscribeId(null);
        }}
        cancelText="아니요"
        confirmText="네"
        onConfirm={() => deleteSubscribe(deleteSubscribeId!.toString())}
        title="정말 삭제하시겠어요?"
        description="이 구독 서비를 삭제하면 저장된 모든 구독 플랜이 함께 삭제됩니다."
      />
    </>
  );
}

export default SubscribeEditorPage;
