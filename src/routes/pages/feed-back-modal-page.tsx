import CloseButton from '@/assets/icons/close-button-icon.svg?react';
import SendingSuccessModal from '@/components/modal/sending-success-modal';
import { Button } from '@/components/ui/button';
import showSuccessToast from '@/components/ui/show-success-toast';
import { Textarea } from '@/components/ui/text-area';
import { STORAGE_KEY } from '@/constants/storage-key';
import useSendFeedBacksMutate from '@/hooks/mutations/use-send-feedbacks-mutate';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function FeedbackModalPage() {
  const navigate = useNavigate();
  const { mutate: sendFeedBacks } = useSendFeedBacksMutate({
    onSuccess: () => {
      localStorage.setItem(STORAGE_KEY.feedbackSubmitted, 'true');
      showSuccessToast({ Content: SendingSuccessModal });
      navigate('/', { state: { feedbackSubmitted: true } });
    },
  });

  const [overall, setOverall] = useState('');
  const [featureRequest, setFeatureRequest] = useState('');

  const isValidFeebackForm =
    overall.trim().length > 0 || featureRequest.trim().length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendFeedBacks({
      overall: overall || null,
      featureRequest: featureRequest || null,
    });
  };

  return (
    <div className="bg-background-black fixed top-0 left-1/2 z-50 flex h-svh w-full max-w-107.5 -translate-x-1/2 flex-col justify-between overflow-hidden p-6">
      <div className="flex-1">
        <div className="mb-6 text-right">
          <CloseButton className="inline-block" onClick={() => navigate(-1)} />
        </div>
        <div className="h-full">
          <p className="mb-6 text-xl font-semibold">
            섭포트에 대한 의견을 <br /> 들려주세요!
          </p>

          <form onSubmit={handleSubmit} id="feedback" className="space-y-6">
            <div>
              <label htmlFor="overall" className="mb-2 block font-semibold">
                사용하면서 느낀 점을 자유롭게 들려주세요
              </label>
              <Textarea
                containerClassName="h-40"
                id="overall"
                placeholder="좋았던 점이나 아쉬웠던 점을 편하게 적어주세요"
                value={overall}
                onChange={(e) => setOverall(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="featureRequest"
                className="mb-2 block font-semibold"
              >
                사용하면서 느낀 점을 자유롭게 들려주세요
              </label>
              <Textarea
                containerClassName="h-40"
                id="featureRequest"
                placeholder="좋았던 점이나 아쉬웠던 점을 편하게 적어주세요"
                value={featureRequest}
                onChange={(e) => setFeatureRequest(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>

      <Button type="submit" disabled={!isValidFeebackForm} form="feedback">
        의견 보내기
      </Button>
    </div>
  );
}

export default FeedbackModalPage;
