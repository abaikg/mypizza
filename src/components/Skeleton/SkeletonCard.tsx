// src/components/Skeleton/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl shadow bg-white p-4 flex flex-col">
      <div className="bg-gray-200 h-40 w-full rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-full mt-auto" />
    </div>
  );
}
