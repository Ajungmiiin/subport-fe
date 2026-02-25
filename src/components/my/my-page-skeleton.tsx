function MyPageSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="mb-4 space-y-3">
        <div className="bg-box-black h-8 w-1/3 animate-pulse rounded-lg"></div>
        <div className="bg-box-black h-8 w-1/2 animate-pulse rounded-lg"></div>
        <div className="bg-box-black h-8 w-1/4 animate-pulse rounded-lg"></div>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <div className="bg-box-black aspect-square w-1/2 animate-pulse rounded-xl"></div>
        <div className="bg-box-black aspect-square w-1/2 animate-pulse rounded-xl"></div>
      </div>

      <div className="mb-4">
        <div className="bg-box-black mb-4 h-6 w-1/5 animate-pulse rounded-lg"></div>
        <div className="bg-box-black h-47 animate-pulse rounded-xl"></div>
      </div>

      <div>
        <div className="bg-box-black mb-4 h-6 w-1/5 animate-pulse rounded-lg"></div>
        <div className="bg-box-black h-30 animate-pulse rounded-xl"></div>
      </div>
    </div>
  );
}

export default MyPageSkeleton;
