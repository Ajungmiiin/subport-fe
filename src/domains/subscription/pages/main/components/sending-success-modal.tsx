import SendSuccessImage from '@/assets/send-success-image.png';

function SendingSuccessModal() {
  return (
    <>
      <div className="fixed inset-0 z-30 bg-black/60" />

      <div className="bg-background-black relative z-50 w-85 max-w-[calc(100vw-48px)] rounded-3xl px-6 py-7 text-center shadow-xl">
        <div className="mb-4">
          <p className="mb-2 text-center text-lg font-semibold text-white">
            의견 잘 받았어요!
          </p>
          <span className="text-sub-font text-center text-sm">
            더 좋은 섭포트로 만들어볼게요
          </span>
        </div>

        <img
          src={SendSuccessImage}
          alt="전송에 선공했습니다"
          className="mx-auto"
        />
      </div>
    </>
  );
}

export default SendingSuccessModal;
