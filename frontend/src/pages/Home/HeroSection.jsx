import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Typewriter } from "react-simple-typewriter";

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || !target) return;
    const num = parseInt(target);
    if (isNaN(num)) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, start, duration]);
  return count;
}

const AnimatedStat = ({ value, label, start }) => {
  const num = value ? parseInt(value) : null;
  const count = useCountUp(num, 1800, start);
  return (
    <div className="flex flex-col items-start">
      <span
        className={`text-2xl sm:text-3xl font-extrabold leading-none transition-all duration-500 ${
          start && num
            ? "text-slate-900 dark:text-white"
            : "text-slate-300 dark:text-gray-600 animate-pulse"
        }`}
      >
        {start && num ? `${count.toLocaleString()}+` : "..."}
      </span>
      <span className="text-slate-500 dark:text-gray-400 text-[11px] sm:text-xs mt-0.5 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
};

const CITY_NODES = [
  { id: "dhaka", label: "Dhaka", x: 300, y: 230, hub: true },
  { id: "chattogram", label: "Chattogram", x: 420, y: 330 },
  { id: "sylhet", label: "Sylhet", x: 430, y: 130 },
  { id: "rajshahi", label: "Rajshahi", x: 150, y: 160 },
  { id: "khulna", label: "Khulna", x: 170, y: 340 },
  { id: "dinajpur", label: "Dinajpur", x: 110, y: 90 },
  { id: "mymensingh", label: "Mymensingh", x: 320, y: 110 },
  { id: "barisal", label: "Barisal", x: 270, y: 370 },
];

const MapGraphic = ({ activeNode, approvedTuitions }) => {
  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      {/* Dot-grid "country" field */}
      <svg viewBox="0 0 600 480" className="w-full h-full">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* dotted landmass silhouette (abstract, not geographic) */}
        {Array.from({ length: 18 }).map((_, row) =>
          Array.from({ length: 22 }).map((_, col) => {
            const cx = 90 + col * 20;
            const cy = 60 + row * 20;
            const dx = (cx - 300) / 220;
            const dy = (cy - 240) / 190;
            const inside = dx * dx + dy * dy < 1;
            if (!inside) return null;
            return (
              <circle
                key={`${row}-${col}`}
                cx={cx}
                cy={cy}
                r="1.6"
                className="fill-slate-300 dark:fill-gray-700"
              />
            );
          }),
        )}

        {/* glow behind hub */}
        <circle cx="300" cy="230" r="90" fill="url(#hubGlow)" />

        {/* connecting curves from each city into the Dhaka hub */}
        {CITY_NODES.filter((n) => !n.hub).map((n) => {
          const midX = (n.x + 300) / 2;
          const midY = (n.y + 230) / 2 - 30;
          return (
            <path
              key={n.id}
              d={`M ${n.x} ${n.y} Q ${midX} ${midY} 300 230`}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              className="stroke-lime-600 dark:stroke-lime-400 opacity-60"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-18"
                dur="1.4s"
                repeatCount="indefinite"
              />
            </path>
          );
        })}

        {/* city nodes */}
        {CITY_NODES.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.hub ? 7 : 4.5}
              className={
                n.hub
                  ? "fill-lime-500 dark:fill-lime-400"
                  : "fill-lime-700 dark:fill-lime-500"
              }
            />
            {n.hub && (
              <circle
                cx={n.x}
                cy={n.y}
                r="7"
                fill="none"
                stroke="#a3e635"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  from="7"
                  to="22"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* HTML labels layered on top so text stays crisp */}
      {CITY_NODES.map((n) => (
        <div
          key={n.id}
          style={{
            left: `${(n.x / 600) * 100}%`,
            top: `calc(10% + ${(n.y / 480) * 80}%)`,
          }}
          className="absolute -translate-x-1/2 -translate-y-[135%]"
        >
          <span
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${
              n.hub
                ? "bg-lime-700 text-white border-lime-700 dark:bg-lime-600 dark:border-lime-600"
                : "bg-white/90 text-slate-700 border-slate-200 dark:bg-gray-800/90 dark:text-gray-200 dark:border-gray-700"
            }`}
          >
            {n.hub && (
              <svg
                className="w-3 h-3 text-lime-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            )}
            {n.label}
          </span>
        </div>
      ))}

      {/* Signature element #1 — live ticker (top-right): real tuition
          requests cycling in as they "arrive" from different districts */}
      {activeNode && (
        <div
          key={activeNode.city}
          className="absolute top-[4%] right-[0%] flex items-center gap-2.5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-lime-100 dark:border-lime-900/40 pl-2.5 pr-3.5 py-2 animate-[popIn_0.4s_ease-out]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-slate-800 dark:text-gray-100">
              {activeNode.subject}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-gray-500">
              Just posted · {activeNode.city}
            </p>
          </div>
        </div>
      )}

      {/* Signature element #2 — coverage card (bottom-left): the steady
          counterpart to the live ticker, showing network scale at a glance */}
      <div className="absolute bottom-[4%] left-[0%] flex items-center gap-2.5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-lime-100 dark:border-lime-900/40 pl-2.5 pr-3.5 py-2">
        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-lime-50 dark:bg-lime-950/40 shrink-0">
          <svg
            className="w-3.5 h-3.5 text-lime-700 dark:text-lime-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-bold text-slate-800 dark:text-gray-100">
            {approvedTuitions ? `${approvedTuitions}+` : "…"} active on the map
          </p>
          <p className="text-[10px] text-slate-400 dark:text-gray-500">
            8 districts, growing
          </p>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const [allTuitions, setAllTuitions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Search state
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Fetch approved tuitions — reused for live ticker + search
  useEffect(() => {
    fetch("https://bdtutionsf.vercel.app/tuition?status=Approved")
      .then((res) => res.json())
      .then((data) => {
        setAllTuitions(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Fetch stats
  useEffect(() => {
    fetch("https://bdtutionsf.vercel.app/admin/dashboard-stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  // Stats intersection observer
  useEffect(() => {
    if (!statsRef.current || !stats) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [stats]);

  // Cycle the live ticker through real tuition posts every few seconds
  useEffect(() => {
    if (allTuitions.length === 0) return;
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % allTuitions.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [allTuitions]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced search
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);

    if (!val.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setSearching(true);
    debounceRef.current = setTimeout(() => {
      const q = val.toLowerCase();
      const filtered = allTuitions
        .filter(
          (t) =>
            t.subject?.toLowerCase().includes(q) ||
            t.class?.toLowerCase().includes(q) ||
            t.location?.toLowerCase().includes(q) ||
            t.description?.toLowerCase().includes(q),
        )
        .slice(0, 6);
      setSearchResults(filtered);
      setShowDropdown(true);
      setSearching(false);
    }, 300);
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    setShowDropdown(false);
    navigate(`/all-tuitions?search=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
    if (e.key === "Escape") setShowDropdown(false);
  };

  const handleCardClick = (id) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/tuition/${id}`);
  };

  const activeTicker = allTuitions.length
    ? {
        subject: allTuitions[tickerIndex]?.subject || "New tuition",
        city: allTuitions[tickerIndex]?.location || "Bangladesh",
      }
    : null;

  if (!loaded) {
    return (
      <div className="flex justify-center items-center h-[65vh] bg-white dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  const statItems = [
    { value: stats?.tutors, label: "Tutors" },
    { value: stats?.students, label: "Students" },
    { value: stats?.approvedTuitions, label: "Tuitions" },
  ];

  return (
    <section className="relative w-full bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: translateY(-6px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-1 pb-5 lg:pt-2 lg:pb-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ---------------- LEFT: TEXT ---------------- */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-lime-600 dark:bg-lime-400" />
            <span className="text-lime-700 dark:text-lime-400 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              Bangladesh's #1 Tuition Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-[2.4rem] font-extrabold text-slate-900 dark:text-white leading-[1.08] mb-4 tracking-tight">
            <span className="block text-lime-600 dark:text-lime-400 min-h-[1.2em]">
              <Typewriter
                words={[
                  "Find The Best Home Tutors",
                  "Learn From Expert Tutors",
                  "Build Your Future Today",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={65}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </span>
            <span className="block text-slate-900 dark:text-white mt-1">
              Near You
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 dark:text-gray-400 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
            Post your tuition needs or discover the perfect tutor effortlessly.
            Trusted by thousands of students across Bangladesh.
          </p>

          {/* Search Bar + Dropdown */}
          <div ref={searchRef} className="relative w-full max-w-md mb-6">
            <div className="flex items-stretch bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm focus-within:border-lime-400 dark:focus-within:border-lime-500 focus-within:ring-2 focus-within:ring-lime-100 dark:focus-within:ring-lime-900/40 transition-all duration-300">
              <div className="flex items-center pl-4 pr-2 text-slate-400 dark:text-gray-500">
                {searching ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                    />
                  </svg>
                )}
              </div>
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() =>
                  searchResults.length > 0 && setShowDropdown(true)
                }
                placeholder="Subject, class, location…"
                className="flex-1 px-2 py-3 sm:py-3.5 bg-transparent text-slate-800 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 text-sm sm:text-base outline-none min-w-0"
              />
              <button
                onClick={handleSearchSubmit}
                className="shrink-0 bg-lime-600 hover:bg-lime-700 active:bg-lime-800 px-4 sm:px-5 py-3 sm:py-3.5 text-white text-sm font-semibold transition-colors duration-200"
              >
                Search
              </button>
            </div>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                {searchResults.length === 0 ? (
                  <div className="px-4 py-5 text-center text-slate-400 dark:text-gray-500 text-sm">
                    No tuitions found for "{query}"
                  </div>
                ) : (
                  <>
                    <div className="px-4 pt-3 pb-1 flex items-center justify-between border-b border-slate-100 dark:border-gray-700">
                      <span className="text-[11px] text-slate-400 dark:text-gray-500 uppercase tracking-widest font-semibold">
                        {searchResults.length} result
                        {searchResults.length !== 1 ? "s" : ""} found
                      </span>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors p-1"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <ul className="max-h-72 overflow-y-auto">
                      {searchResults.map((tuition, idx) => (
                        <li key={tuition._id}>
                          <button
                            onClick={() => handleCardClick(tuition._id)}
                            className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-gray-700/50 active:bg-slate-100 dark:active:bg-gray-700 transition-colors duration-150 group ${
                              idx !== searchResults.length - 1
                                ? "border-b border-slate-100 dark:border-gray-700"
                                : ""
                            }`}
                          >
                            <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600">
                              {tuition.image ? (
                                <img
                                  src={tuition.image}
                                  alt={tuition.subject}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-gray-500">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-slate-800 dark:text-gray-100 text-sm font-semibold truncate group-hover:text-lime-700 dark:group-hover:text-lime-400 transition-colors">
                                  {tuition.subject}
                                </span>
                                <span className="shrink-0 text-[10px] bg-lime-50 dark:bg-lime-950/40 text-lime-700 dark:text-lime-400 px-1.5 py-0.5 rounded-md font-medium">
                                  Class {tuition.class}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-gray-500">
                                <span className="flex items-center gap-1 truncate">
                                  <svg
                                    className="w-3 h-3 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                  {tuition.location}
                                </span>
                                {tuition.budget && (
                                  <>
                                    <span className="text-slate-300 dark:text-gray-600 shrink-0">
                                      •
                                    </span>
                                    <span className="text-lime-700 dark:text-lime-400 font-medium shrink-0">
                                      ৳{tuition.budget}/mo
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <svg
                              className="w-4 h-4 text-slate-300 dark:text-gray-600 group-hover:text-lime-600 dark:group-hover:text-lime-400 group-hover:translate-x-0.5 transition-all duration-150 shrink-0"
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
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={handleSearchSubmit}
                      className="w-full px-4 py-3 text-sm text-lime-700 dark:text-lime-400 hover:text-lime-800 dark:hover:text-lime-300 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors border-t border-slate-100 dark:border-gray-700 text-center font-medium"
                    >
                      See all results for "{query}" →
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a
              href="/tutors"
              className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 active:scale-95 text-white text-sm sm:text-base font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-lime-600/20 dark:shadow-lime-900/40 transition-all duration-200"
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Find a Tutor
            </a>
            <a
              href="/add-tuition"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 active:scale-95 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 text-sm sm:text-base font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              Post a Tuition
            </a>
          </div>

          {/* Bottom row: stats + a signature "network coverage" strip
              that ties directly back to the map's 8 district nodes */}
          <div className="flex flex-wrap items-center gap-8">
            <div ref={statsRef} className="flex flex-wrap gap-8">
              {statItems.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  start={statsVisible}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl px-4 py-2.5 shadow-sm">
              <div className="flex -space-x-2">
                {CITY_NODES.slice(0, 5).map((n, i) => (
                  <span
                    key={n.id}
                    className={`w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${
                      n.hub
                        ? "bg-lime-500 dark:bg-lime-400"
                        : "bg-lime-700/70 dark:bg-lime-500/70"
                    }`}
                    style={{ zIndex: 5 - i }}
                  />
                ))}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-800 dark:text-gray-100">
                  8 Districts, 1 Network
                </p>
                <p className="text-[10px] text-slate-400 dark:text-gray-500">
                  from Dinajpur to Barisal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT: MAP GRAPHIC ---------------- */}
        <div className="relative">
          <MapGraphic
            activeNode={activeTicker}
            approvedTuitions={stats?.approvedTuitions}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
