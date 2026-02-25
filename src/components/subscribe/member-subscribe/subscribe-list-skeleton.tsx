function SubscribeListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-box-black h-21 w-full animate-pulse rounded-xl"
        ></div>
      ))}
    </div>
  );
}

export default SubscribeListSkeleton;
