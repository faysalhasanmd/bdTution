import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [stats, setStats] = useState(null);

  // Fetch slideshow images
  useEffect(() => {
    fetch("https://tuitionsbd.vercel.app/tuition?status=Approved")
      .then((res) => res.json())
      .then((data) => {
        const imageList = data.map((item) => item.image).filter((img) => img);
        setImages(imageList);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch real stats from backend
  useEffect(() => {
    fetch("https://tuitionsbd.vercel.app/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  // Slideshow interval
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

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-slate-900">
        <LoadingSpinner />
      </div>
    );
  }

  const statItems = [
    { value: stats ? `${stats.tutors}+` : "...", label: "Tutors" },
    { value: stats ? `${stats.students}+` : "...", label: "Students" },
    { value: stats ? `${stats.approvedTuitions}+` : "...", label: "Tuitions" },
  ];

  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden bg-slate-900">
      {/* Background Slideshow */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${images[current]})` }}
      />

      {/* Multi-layer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent hidden sm:block" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 sm:left-auto sm:translate-x-0 sm:right-8 sm:bottom-8 sm:flex-col">
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
      <div className="relative z-10 min-h-[70vh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-12 sm:py-16">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <span className="h-px w-8 bg-blue-400" />
            <span className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Bangladesh's #1 Tuition Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6 tracking-tight">
            <span className="block text-slate-400 text-base sm:text-lg font-medium tracking-[0.2em] uppercase mb-2">
              Welcome to TuitionHub
            </span>
            <span className="block whitespace-nowrap overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
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
            <span className="block text-white mt-1 relative w-fit">
              Near You
              <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-lg mb-8 sm:mb-10 leading-relaxed">
            Post your tuition needs or discover the perfect tutor effortlessly.
            Trusted by thousands of students across Bangladesh.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex items-stretch bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl focus-within:border-blue-400 focus-within:bg-white/15 transition-all duration-300">
              <div className="flex items-center pl-4 pr-2 text-slate-400">
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
              </div>
              <input
                type="text"
                placeholder="Subject, class, location…"
                className="flex-1 px-2 py-3.5 sm:py-4 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none min-w-0"
              />
              <button className="shrink-0 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 sm:px-6 py-3.5 sm:py-4 text-white text-sm sm:text-base font-semibold transition-colors duration-200 rounded-r-2xl">
                Search
              </button>
            </div>
          </div>

          {/* Stats row — real backend data */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-8 sm:mt-10">
            {statItems.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span
                  className={`text-xl sm:text-2xl font-extrabold transition-all duration-500 ${
                    stats ? "text-white" : "text-slate-500 animate-pulse"
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-slate-400 text-xs sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
