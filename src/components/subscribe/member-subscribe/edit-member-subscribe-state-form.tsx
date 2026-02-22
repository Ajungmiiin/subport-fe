import ConfirmModal from '@/components/modal/confirm-modal';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useDeactivateMemberSubscribeMutate from '@/hooks/mutations/use-deactivate-member-subscribe-mutate';
import useDeleteMemberSubscribeMutate from '@/hooks/mutations/use-delete-member-subscribe-mutate';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

type SubscribeState = 'deActivate' | 'delete';

const SUBSCRIBE_STATE = [
  {
    label: '비활성화하기',
    value: 'deActivate' as const,
  },
  {
    label: '삭제하기',
    value: 'delete' as const,
  },
];

function EditMemberSubscribeStateForm() {
  const { memberSubscribeId } = useParams();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const { mutate: deleteMemberSubscribe } = useDeleteMemberSubscribeMutate({
    onSuccess: () => {
      navigate('/');
      toast.success('정상적으로 삭제되었습니다', { position: 'bottom-center' });
    },
  });

  const { mutate: deactivateMemberSubscribe } =
    useDeactivateMemberSubscribeMutate({
      onSuccess: () => {
        navigate(-1);
        toast.success('구독 서비스가 비활성화 되었습니다', {
          position: 'bottom-center',
        });
      },
    });
  const [subscribeState, setSubscribeState] = useState<SubscribeState>();

  const handleChangeSubscribeState = () => {
    if (subscribeState === 'deActivate') {
      deactivateMemberSubscribe({ memberSubscribeId: memberSubscribeId! });
    }

    if (subscribeState === 'delete') {
      deleteMemberSubscribe({ memberSubscribeId: memberSubscribeId! });
    }
  };

  return (
    <>
      <section className="flex h-full flex-col justify-between">
        <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
          구독 상태를 변경할까요?
        </p>

        <div className="scrollbar-hide flex-1 overflow-scroll">
          <RadioGroup value={subscribeState}>
            {SUBSCRIBE_STATE.map((state) => (
              <div
                onClick={() => setSubscribeState(state.value)}
                key={state.value}
                className="bg-box-black hover:bg-box-black/80 flex cursor-pointer items-center justify-between rounded-2xl px-5 py-4 transition-colors"
              >
                <div>
                  <p className={cn('mb-2 text-lg font-semibold')}>
                    {state.label}
                  </p>
                  <span className="text-sub-font-black text-sm">
                    {state.value === 'deActivate' &&
                      '저장된 구독 정보는 그대로 남아있어요'}
                    {state.value === 'delete' &&
                      '저장된 구독 정보가 모두 사라져요'}
                  </span>
                </div>

                <RadioGroupItem value={state.value} />
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="rounded-t-2xl pt-4">
          <Button
            onClick={() => setModal(true)}
            disabled={!subscribeState}
            className="w-full"
          >
            확인하기
          </Button>
        </div>
      </section>
      <ConfirmModal
        open={modal}
        onOpenChange={() => setModal(false)}
        cancelText="아니요"
        confirmText="네"
        title={
          subscribeState === 'deActivate'
            ? '비활성화 하시겠어요?'
            : '정말 삭제하시겠어요?'
        }
        description={
          subscribeState === 'deActivate'
            ? '비활성화하면 저장된 구독 정보는 그대로 남아있습니다. 이후 다시 사용 가능합니다.'
            : '삭제하시면 지금까지 남아 있던 기록이 모두 사라집니다.이후 다시 이용하시려면 새로 등록해 주세요.'
        }
        onConfirm={handleChangeSubscribeState}
      />
    </>
  );
}

export default EditMemberSubscribeStateForm;
