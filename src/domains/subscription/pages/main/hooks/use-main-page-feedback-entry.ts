import { STORAGE_KEY } from '@/shared/constants/storage-key';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TODAY_DATE = new Date().toLocaleDateString('sv-SE');

function useMainPageFeedbackEntry() {
  const [isDismissed, setIsDismissed] = useState(false);

  const location = useLocation();

  const isMainPage = location.pathname === '/';
  const shouldSkipFeedbackEntry = location.state?.skipFeedbackEntry === true;
  const isFeedbackEntrySuppressed =
    sessionStorage.getItem(STORAGE_KEY.feedbackEntrySuppressed) === 'true';

  const hiddenDate = localStorage.getItem(STORAGE_KEY.feedbackEntryHiddenUntil);
  const hasSubmittedFeedback =
    localStorage.getItem(STORAGE_KEY.feedbackSubmitted) === 'true';

  const closeFeedbackEntry = () => {
    setIsDismissed(true);
  };

  const canOpenFeedbackEntry =
    isMainPage &&
    !shouldSkipFeedbackEntry &&
    !isFeedbackEntrySuppressed &&
    hiddenDate !== TODAY_DATE &&
    !hasSubmittedFeedback;

  const shouldRenderFeedbackEntry = canOpenFeedbackEntry && !isDismissed;

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(STORAGE_KEY.feedbackEntrySuppressed);
    };
  }, []);

  return {
    shouldRenderFeedbackEntry,
    closeFeedbackEntry,
  };
}

export default useMainPageFeedbackEntry;
