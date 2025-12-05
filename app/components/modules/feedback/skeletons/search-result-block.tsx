interface Props {
  count: number;
}

export default function SearchResultBlockSkeleton({ count }: Props) {
  return (
    <div className="space-y-1 mt-10">
      <div className="h-7 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      <div className="space-y-1">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="rounded-lg p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}