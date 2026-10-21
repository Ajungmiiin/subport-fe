function CustomPlanEditCardSkeleton({ length = 3 }: { length?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: length }).map((_, idx) => (
        <div
          key={idx}
          className="bg-box-black h-38 w-full animate-pulse rounded-2xl p-5"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="bg-background-black size-10 animate-pulse rounded-lg"></div>
            <div className="bg-background-black h-6 w-1/2 rounded-lg"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-background-black h-14 flex-1 animate-pulse rounded-xl"></div>
            <div className="bg-background-black h-14 flex-1 animate-pulse rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomPlanEditCardSkeleton;
