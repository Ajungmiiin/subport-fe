import { Link, useParams } from 'react-router-dom';

function UserSubscriptionEditLink() {
  const { userSubscribeId } = useParams();

  return (
    <Link
      className="text-sm"
      to={`/user-subscription/${userSubscribeId}/edit`}
    >
      편집
    </Link>
  );
}

export default UserSubscriptionEditLink;
