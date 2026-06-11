import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "../../Home/Card";

const ITEMS_PER_PAGE = 8;

// ─── Skeleton ────────────────────────────────────────────────────────────────
const AllTuitionsSkeleton = () => (
  <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors">
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="h-8 w-20 rounded-lg bg-white/20 animate-pulse mb-5" />
        <div className="text-center flex flex-col items-center gap-3">
          <div className="h-6 w-36 rounded-full bg-white/20 animate-pulse" />
          <div className="h-10 w-72 sm:w-96 rounded-lg bg-white/20 animate-pulse" />
          <div className="h-4 w-56 rounded-lg bg-white/15 animate-pulse" />
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
        <div className="hidden sm:flex items-center gap-3 flex-wrap px-5 py-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 flex-1 min-w-[100px] rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-12 pt-3">
      <div className="grid gap-3 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 p-4 flex flex-col gap-3"
          >
            <div className="h-36 rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-gray-700 animate-pulse" />
            </div>
            <div className="h-3 w-3/5 rounded bg-slate-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-9 w-full rounded-xl bg-slate-200 dark:bg-gray-700 animate-pulse mt-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Pagination Component ─────────────────────────────────────────────────────
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Always show first, last, current, and neighbors
  const getPageNumbers = () => {
    const result = new Set();
    result.add(1);
    result.add(totalPages);
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      result.add(i);
    }
    return [...result].sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Prev
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, idx) => {
        const prev = pageNumbers[idx - 1];
        return (
          <div key={page} className="flex items-center gap-1.5">
            {/* Ellipsis */}
            {prev && page - prev > 1 && (
              <span className="px-1 text-slate-400 dark:text-gray-500 text-sm select-none">
                …
              </span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-lime-500 text-white shadow-sm"
                  : "border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          </div>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AllTuitions = () => {
  const navigate = useNavigate();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://bdtutionsf.vercel.app/tuition?status=Approved")
      .then((res) => {
        setTuitions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <AllTuitionsSkeleton />;

  const filteredTuitions = tuitions.filter((item) => {
    const matchesSearch =
      item.subject?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());
    return (
      matchesSearch &&
      (filterClass
        ? item.class?.toLowerCase().includes(filterClass.toLowerCase())
        : true) &&
      (filterSubject
        ? item.subject?.toLowerCase().includes(filterSubject.toLowerCase())
        : true) &&
      (filterLocation
        ? item.location?.toLowerCase().includes(filterLocation.toLowerCase())
        : true)
    );
  });

  const sortedTuitions = [...filteredTuitions].sort((a, b) => {
    if (sortOption === "lowHigh") return a.budget - b.budget;
    if (sortOption === "highLow") return b.budget - a.budget;
    if (sortOption === "newest")
      return new Date(b.postedAt) - new Date(a.postedAt);
    if (sortOption === "oldest")
      return new Date(a.postedAt) - new Date(b.postedAt);
    return 0;
  });

  const totalPages = Math.ceil(sortedTuitions.length / ITEMS_PER_PAGE);
  const paginatedTuitions = sortedTuitions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilterCount = [
    filterClass,
    filterSubject,
    filterLocation,
    sortOption,
  ].filter(Boolean).length;

  const clearAll = () => {
    setSearch("");
    setFilterClass("");
    setFilterSubject("");
    setFilterLocation("");
    setSortOption("");
    setCurrentPage(1);
  };

  // Reset to page 1 whenever filters change
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputClass =
    "border border-slate-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-800">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center bg-lime-500 px-3 py-2 rounded gap-1.5 text-white/80 hover:text-white text-sm mb-5 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <div className="text-center">
            <span className="inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wider uppercase">
              Verified Listings
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              All Approved Tuitions
            </h1>
            <p className="text-blue-100 mt-2 text-sm sm:text-base max-w-md mx-auto">
              Browse {tuitions.length} verified tuition opportunities across
              Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
          {/* Mobile toggle */}
          <div className="flex items-center justify-between px-4 py-3 sm:hidden">
            <button
              onClick={() => setFiltersOpen((p) => !p)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-200"
            >
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h18M7 10h10M11 16h2"
                />
              </svg>
              Filters & Sort
              {activeFilterCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-500 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Mobile filters */}
          <div
            className={`px-4 pb-4 sm:hidden ${filtersOpen ? "block" : "hidden"}`}
          >
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Class"
                className={inputClass}
                value={filterClass}
                onChange={handleFilterChange(setFilterClass)}
              />
              <input
                type="text"
                placeholder="Subject"
                className={inputClass}
                value={filterSubject}
                onChange={handleFilterChange(setFilterSubject)}
              />
              <input
                type="text"
                placeholder="Location"
                className={inputClass}
                value={filterLocation}
                onChange={handleFilterChange(setFilterLocation)}
              />
              <select
                className={inputClass}
                value={sortOption}
                onChange={handleFilterChange(setSortOption)}
              >
                <option value="">Sort by</option>
                <option value="lowHigh">Budget: Low → High</option>
                <option value="highLow">Budget: High → Low</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          {/* Desktop filters */}
          <div className="hidden sm:flex items-center gap-3 flex-wrap px-5 py-4">
            <input
              type="text"
              placeholder="Class"
              className={`${inputClass} flex-1 min-w-[100px]`}
              value={filterClass}
              onChange={handleFilterChange(setFilterClass)}
            />
            <input
              type="text"
              placeholder="Subject"
              className={`${inputClass} flex-1 min-w-[110px]`}
              value={filterSubject}
              onChange={handleFilterChange(setFilterSubject)}
            />
            <input
              type="text"
              placeholder="Location"
              className={`${inputClass} flex-1 min-w-[110px]`}
              value={filterLocation}
              onChange={handleFilterChange(setFilterLocation)}
            />
            <select
              className={`${inputClass} flex-1 min-w-[150px]`}
              value={sortOption}
              onChange={handleFilterChange(setSortOption)}
            >
              <option value="">Sort by</option>
              <option value="lowHigh">Budget: Low → High</option>
              <option value="highLow">Budget: High → Low</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="shrink-0 text-xs text-red-500 font-semibold px-3 py-2 border border-red-200 dark:border-red-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-4">
        <div className="relative overflow-hidden rounded-2xl border border-orange-200/50 dark:border-orange-800/50 bg-gradient-to-r from-orange-50 via-white to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-sm">
          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4">
            {/* Left Side */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/40">
                📚
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Showing Results
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Browse available tuition opportunities
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-xl bg-white/80 dark:bg-slate-800/80 px-4 py-2 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Showing
                </span>{" "}
                <span className="font-bold text-orange-500">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    sortedTuitions.length,
                  )}
                </span>
              </div>

              <div className="rounded-xl bg-white/80 dark:bg-slate-800/80 px-4 py-2 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Total
                </span>{" "}
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {sortedTuitions.length}
                </span>
              </div>

              {totalPages > 1 && (
                <div className="rounded-xl bg-orange-500 text-white px-4 py-2 font-semibold shadow-sm">
                  Page {currentPage}/{totalPages}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-4 pt-3">
        {sortedTuitions.length > 0 ? (
          <>
            <div className="grid gap-3 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedTuitions.map((item) => (
                <Card key={item._id} item={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 sm:py-28">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300">
              No Tuitions Found
            </h3>
            <p className="text-slate-400 dark:text-slate-500 mt-2 text-sm max-w-xs mx-auto">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={clearAll}
              className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTuitions;
