import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Typewriter } from "react-simple-typewriter";

// Animated counter hook
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
          start && num ? "text-white" : "text-slate-500 animate-pulse"
        }`}
      >
        {start && num ? `${count.toLocaleString()}+` : "..."}
      </span>
      <span className="text-slate-400 text-xs sm:text-sm mt-0.5 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [stats, setStats] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Search state
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [allTuitions, setAllTuitions] = useState([]);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Fetch approved tuitions — reuse for slideshow + search
  useEffect(() => {
    fetch(
      "https://miraculous-vibrancy-production.up.railway.app//tuition?status=Approved",
    )
      .then((res) => res.json())
      .then((data) => {
        setAllTuitions(data);
        const imageList = data.map((item) => item.image).filter(Boolean);
        setImages(imageList);
      })
      .catch(console.error);
  }, []);

  // Fetch stats
  useEffect(() => {
    fetch(
      "https://miraculous-vibrancy-production.up.railway.app//admin/dashboard-stats",
    )
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

  // Slideshow
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

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

  // ✅ Click on result card → /tuition/:id (matches router)
  const handleCardClick = (id) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/tuition/${id}`);
  };

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center h-[65vh] bg-slate-900">
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
    <section className="relative w-full h-[65vh] min-h-[520px] overflow-hidden bg-slate-900">
      {/* Background Slideshow */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${images[current]})` }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/75 to-slate-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      {/* Left accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent hidden sm:block" />

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20 sm:left-auto sm:translate-x-0 sm:right-6 sm:bottom-6 sm:flex-col">
        {images.slice(0, Math.min(images.length, 6)).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrent(i);
                setFade(true);
              }, 300);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-blue-400 w-6 h-2 sm:w-2 sm:h-6"
                : "bg-white/30 hover:bg-white/60 w-2 h-2"
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-8">
          {/* ① Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-blue-400" />
            <span className="text-blue-400 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em]">
              Bangladesh's #1 Tuition Platform
            </span>
          </div>

          {/* ② Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight mb-3 tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
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
            <span className="block text-white mt-0.5 relative w-fit">
              Near You
              <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
            </span>
          </h1>

          {/* ③ Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base max-w-md mb-5 leading-relaxed">
            Post your tuition needs or discover the perfect tutor effortlessly.
            Trusted by thousands of students across Bangladesh.
          </p>

          {/* ④ Search Bar + Dropdown */}
          <div
            ref={searchRef}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mb-4"
          >
            {/* Input */}
            <div className="flex items-stretch bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl focus-within:border-blue-400 focus-within:bg-white/15 transition-all duration-300">
              <div className="flex items-center pl-4 pr-2 text-slate-400">
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
                className="flex-1 px-2 py-3 sm:py-3.5 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none min-w-0"
              />
              <button
                onClick={handleSearchSubmit}
                className="shrink-0 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 sm:px-5 py-3 sm:py-3.5 text-white text-sm font-semibold transition-colors duration-200 rounded-r-2xl"
              >
                Search
              </button>
            </div>

            {/* ✅ Dropdown Results */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl">
                {searchResults.length === 0 ? (
                  <div className="px-4 py-5 text-center text-slate-400 text-sm">
                    No tuitions found for "{query}"
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="px-4 pt-3 pb-1 flex items-center justify-between border-b border-white/5">
                      <span className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">
                        {searchResults.length} result
                        {searchResults.length !== 1 ? "s" : ""} found
                      </span>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="text-slate-500 hover:text-slate-300 transition-colors p-1"
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

                    {/* Cards */}
                    <ul className="max-h-72 overflow-y-auto">
                      {searchResults.map((tuition, idx) => (
                        <li key={tuition._id}>
                          <button
                            onClick={() => handleCardClick(tuition._id)}
                            className={`w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-white/5 active:bg-white/10 transition-colors duration-150 group ${
                              idx !== searchResults.length - 1
                                ? "border-b border-white/5"
                                : ""
                            }`}
                          >
                            {/* Thumbnail */}
                            <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                              {tuition.image ? (
                                <img
                                  src={tuition.image}
                                  alt={tuition.subject}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
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

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-white text-sm font-semibold truncate group-hover:text-blue-300 transition-colors">
                                  {tuition.subject}
                                </span>
                                <span className="shrink-0 text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-md font-medium">
                                  Class {tuition.class}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-400">
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
                                    <span className="text-slate-600 shrink-0">
                                      •
                                    </span>
                                    <span className="text-cyan-400 font-medium shrink-0">
                                      ৳{tuition.budget}/mo
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Arrow */}
                            <svg
                              className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all duration-150 shrink-0"
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

                    {/* See all */}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full px-4 py-3 text-sm text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors border-t border-white/5 text-center font-medium"
                    >
                      See all results for "{query}" →
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* ⑤ CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="/tutors"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm sm:text-base font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200"
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
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/25 text-white text-sm sm:text-base font-semibold px-5 py-2.5 rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              Post a Tuition
            </a>
          </div>

          {/* ⑥ Animated Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-6 sm:gap-10">
            {statItems.map((stat) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                start={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
