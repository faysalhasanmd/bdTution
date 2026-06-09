const AllTuitionsSkeleton = () => {
  const cardCount = 8;

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          {/* Back button skeleton */}
          <div className="h-8 w-20 rounded-lg bg-white/20 animate-pulse mb-5" />

          <div className="text-center flex flex-col items-center gap-3">
            {/* Badge */}
            <div className="h-6 w-36 rounded-full bg-white/20 animate-pulse" />
            {/* Title */}
            <div className="h-10 w-72 sm:w-96 rounded-lg bg-white/20 animate-pulse" />
            {/* Subtitle */}
            <div className="h-4 w-56 rounded-lg bg-white/15 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
          {/* Mobile filter toggle skeleton */}
          <div className="flex items-center justify-between px-4 py-3 sm:hidden">
            <div className="h-5 w-32 rounded-lg bg-slate-200 dark:bg-gray-700 animate-pulse" />
          </div>

          {/* Desktop filters skeleton */}
          <div className="hidden sm:flex items-center gap-3 flex-wrap px-5 py-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-10 flex-1 min-w-[100px] rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results count skeleton */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-2 flex justify-center">
        <div className="h-4 w-40 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12 pt-3">
        <div className="grid gap-3 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(cardCount)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 p-4 flex flex-col gap-3"
            >
              {/* Thumbnail */}
              <div className="h-36 rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse" />
              {/* Class / label */}
              <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
              {/* Subject title */}
              <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
              {/* Tags row */}
              <div className="flex gap-2">
                <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
              </div>
              {/* Meta line 1 */}
              <div className="h-3 w-3/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
              {/* Meta line 2 */}
              <div className="h-3 w-2/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
              {/* CTA Button */}
              <div className="h-9 w-full rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTuitionsSkeleton;
