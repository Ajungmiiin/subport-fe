import useGetSuspenseMyProfile from '../../../hooks/queries/use-get-suspense-my-profile';

function MyPageProfileSummary() {
  const { data: profile } = useGetSuspenseMyProfile();

  return (
    <p className="mb-4 text-2xl/relaxed font-semibold">
      {`${profile.nickname}님!`}
      <br />
      구독을 관리한지
      <br />
      <span className="text-primary">{`D+${profile.joinedDays}`}</span>
    </p>
  );
}

export default MyPageProfileSummary;
