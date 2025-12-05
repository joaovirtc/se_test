interface Props {
  count: number;
}

export default function SearchResultBlockSkeleton({ count }: Props) {
  return (
    <div className="p-2 space-y-4">
      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="rounded-lg">
            <div className="h-2 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}