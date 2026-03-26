import ErrorImage from '@/assets/error-image.png';
import NotFoundErrorImage from '@/assets/not-found-error-image.png';
import { Button } from '@/components/ui/button';
import {
  isRouteErrorResponse,
  useNavigate,
  useRevalidator,
  useRouteError,
} from 'react-router-dom';
function RootErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { revalidate, state } = useRevalidator();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  const handleClickRevalidate = () => {
    if (isNotFound) {
      navigate('/', { replace: true });
      return;
    }

    if (!isNotFound) {
      revalidate();
    }
  };

  return (
    <div className="bg-background-black mx-auto flex h-svh max-w-107.5 flex-col items-center justify-center gap-4">
      <img
        src={isNotFound ? NotFoundErrorImage : ErrorImage}
        alt="에러 이미지"
        className="mx-auto mb-4 max-w-35"
      />

      <p className="text-lg text-white">
        {isNotFound
          ? '요청하신 페이지를 찾을 수 없습니다'
          : '서비스 이용이 원활하지 않아요'}
      </p>

      <span className="text-sub-font-black text-center text-sm">
        {isNotFound ? (
          '페이지가 삭제되었거나 이동되었어요'
        ) : (
          <>
            불편을 드려 죄송해요 <br />
            잠시 후에 다시 시도해주세요
          </>
        )}
      </span>

      <div className="flex items-center gap-4">
        <Button
          disabled={state === 'loading'}
          onClick={handleClickRevalidate}
          className="rounded-full px-8 py-3 font-semibold"
        >
          {isNotFound ? '홈으로 돌아가기' : '다시 시도'}
        </Button>

        {!isNotFound && (
          <Button
            onClick={() => navigate(-1)}
            className="text-background-black rounded-full bg-white px-8 py-3 font-semibold hover:bg-white"
          >
            뒤로 가기
          </Button>
        )}
      </div>
    </div>
  );
}

export default RootErrorPage;
