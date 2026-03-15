import useGetMemberSubscribeById from '@/hooks/queries/use-get-member-subscribe-by-id';
import { Loader2, LucideChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

function MemberSubscribeEditPage() {
  const { memberSubscribeId } = useParams();

  const { data: subscribe, isPending: isGetMemberSubscribePending } =
    useGetMemberSubscribeById(memberSubscribeId!);

  if (isGetMemberSubscribePending) return <Loader2 />;

  if (!subscribe) return <p>데이터 없음</p>;
  return (
    <section className="flex h-full flex-col justify-between">
      <div className="mb-10 flex flex-col items-center justify-center gap-4">
        <img src={subscribe.logoImageUrl} className="size-15 rounded-xl" />
        <span className="bg-box-black inline-flex self-center rounded-full px-3.5 py-1.5 text-sm">
          활성화
        </span>
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sub-font-black text-sm">이름</span>
          <p>{subscribe.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sub-font-black text-sm">멤버십 종류</span>
          <Link to="plan" className="flex items-center gap-1">
            {subscribe.planName}
            <LucideChevronRight className="stroke-sub-font-black size-5" />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sub-font-black text-sm">더치페이 여부</span>
          <Link to="dutchpay" className="flex items-center gap-1">
            {subscribe.dutchPay ? '더치페이 중' : '혼자 사용중'}
            <LucideChevronRight className="stroke-sub-font-black size-5" />
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sub-font-black text-sm">결제주기</span>
          <p>{subscribe.durationMonths + '달'}</p>
        </div>
      </div>
    </section>
  );
}

export default MemberSubscribeEditPage;
