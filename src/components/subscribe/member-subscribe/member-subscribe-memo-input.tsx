import useUpdatedMemberSubscribeMemo from '@/hooks/mutations/use-updated-member-subscribe-memo';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface MemberSubscribeMemoInputProps {
  memo: string;
  memberSubscribeId: number;
}

function MemberSubscribeMemoInput({
  memo,
  memberSubscribeId,
}: MemberSubscribeMemoInputProps) {
  const { mutate: updateMemo } = useUpdatedMemberSubscribeMemo({
    onSuccess: () => {
      toast.success('메모가 수정되었습니다.', { position: 'bottom-center' });
      setEdit(false);
    },
  });

  const memoInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(memo);
  const [edit, setEdit] = useState(false);

  const handleUpdatedMemo = () => {
    updateMemo({
      updatedMemo: value,
      memberSubscribeId: memberSubscribeId.toString(),
    });
  };

  useEffect(() => {
    if (edit) {
      memoInputRef.current?.focus();
    }
  }, [edit]);

  useEffect(() => {
    return () => {
      if (edit) {
        handleUpdatedMemo();
      }
    };
  }, []);

  return (
    <div
      onClick={() => {
        if (!edit) {
          setEdit(true);
        }
      }}
      className="bg-box-black rounded-lg p-5"
    >
      <p className="font-semibold">메모</p>

      <>
        {!edit && (
          <>
            {memo.trim().length <= 0 && (
              <p className="text-sub-font-black text-sm">
                작성된 메모가 존재하지 않습니다.
              </p>
            )}
            {memo.trim().length > 0 && <p>{memo}</p>}
          </>
        )}

        {edit && (
          <input
            ref={memoInputRef}
            className="w-full outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              if (edit) {
                handleUpdatedMemo();
              }
            }}
          />
        )}
      </>
    </div>
  );
}

export default MemberSubscribeMemoInput;
