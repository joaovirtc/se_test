// app/[locale]/search/loading.tsx
import SearchResultBlockSkeleton from "@/app/components/modules/feedback/skeletons/search-result-block";

function SearchLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      <SearchResultBlockSkeleton count={8} />
    </div>
  );
}

export default SearchLoading;