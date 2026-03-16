import useUpdatedMemberSubscribeMemo from '@/hooks/mutations/use-updated-member-subscribe-memo';
import useDebounce from '@/hooks/use-debunce';
import { tokenStorage } from '@/lib/token-storage';
import { useEffect, useRef, useState } from 'react';

interface MemberSubscribeMemoInputProps {
  memo: string;
  memberSubscribeId: number;
}

function MemberSubscribeMemoInput({
  memo,
  memberSubscribeId,
}: MemberSubscribeMemoInputProps) {
  const memoInputRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState(memo);
  const debouncedValue = useDebounce(value, 500);
  const latestValueRef = useRef(memo);
  const latestSavedValueRef = useRef(memo);
  const [edit, setEdit] = useState(false);

  const { mutate: updateMemo } = useUpdatedMemberSubscribeMemo({
    onSuccess: () => {
      latestSavedValueRef.current = debouncedValue;
    },
  });

  const handleUpdatedMemo = () => {
    updateMemo({
      updatedMemo: value,
      memberSubscribeId: memberSubscribeId.toString(),
    });
  };

  useEffect(() => {
    if (!edit) return;
    if (debouncedValue === latestSavedValueRef.current) return;

    updateMemo({
      updatedMemo: debouncedValue,
      memberSubscribeId: memberSubscribeId.toString(),
    });
    latestValueRef.current = debouncedValue;
  }, [debouncedValue, edit, memberSubscribeId, updateMemo]);

  useEffect(() => {
    if (!edit) return;

    const el = memoInputRef.current;
    if (!el) return;

    el.focus();
    const end = el.value.length;
    el.setSelectionRange(end, end);
  }, [edit]);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  const flushMemo = async (mode: 'normal' | 'leave') => {
    const nextValue = latestValueRef.current;
    if (nextValue === latestSavedValueRef.current) return;

    if (mode === 'normal') {
      updateMemo({
        updatedMemo: nextValue,
        memberSubscribeId: memberSubscribeId.toString(),
      });
      latestSavedValueRef.current = nextValue;
      return;
    }

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/member-subscriptions/${memberSubscribeId}/memo`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.getToken()}`,
        },
        credentials: 'include',
        keepalive: true,
        body: JSON.stringify({ memo: nextValue }),
      },
    );

    latestSavedValueRef.current = nextValue;
  };

  useEffect(() => {
    return () => {
      flushMemo('normal');
    };
  }, []);

  useEffect(() => {
    const handlePageHide = () => {
      flushMemo('leave');
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
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
              <p className="text-sub-font-black h-auto w-full text-sm">
                작성된 메모가 존재하지 않습니다.
              </p>
            )}
            {memo.trim().length > 0 && (
              <p className="break-words whitespace-pre-wrap">{memo}</p>
            )}
          </>
        )}

        {edit && (
          <textarea
            ref={memoInputRef}
            className="w-full resize-none outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              if (value !== latestSavedValueRef.current) {
                handleUpdatedMemo();

                latestValueRef.current = value;
              }
              setEdit(false);
            }}
          />
        )}
      </>
    </div>
  );
}

export default MemberSubscribeMemoInput;
