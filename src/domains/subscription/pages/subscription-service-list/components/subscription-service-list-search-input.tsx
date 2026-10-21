import SearchIcon from '@/assets/icons/search-icon.svg?react';

interface SubscriptionServiceListSearchInputProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SubscriptionServiceListSearchInput({
  searchTerm,
  onChange,
}: SubscriptionServiceListSearchInputProps) {
  return (
    <div className="relative">
      <input
        value={searchTerm}
        onChange={onChange}
        className="bg-box-black w-full rounded-full px-4 py-3 outline-none"
      />
      <SearchIcon
        aria-hidden
        className="absolute top-1/2 right-4 size-6 -translate-y-1/2"
      />
    </div>
  );
}

export default SubscriptionServiceListSearchInput;
