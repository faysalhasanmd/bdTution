import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const TutorCard = ({ tutor }) => {
  const initials = tutor.name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      data-aos="fade-up"
      className="group relative bg-white dark:bg-gray-800/40 dark:backdrop-blur-md rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      {/* Decorative background glow on hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-lime-400/20 to-emerald-400/0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Header: Avatar & Main Info */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-400 to-emerald-500 rounded-2xl blur-[2px] opacity-70 group-hover:rotate-6 transition-transform duration-300" />
            {tutor.image ? (
              <img
                src={tutor.image}
                alt={tutor.name}
                loading="lazy"
                className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-gray-800 shadow-md"
              />
            ) : (
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xl font-bold border-2 border-white dark:border-gray-800 shadow-md">
                {initials}
              </div>
            )}
            {/* Active/Verified Badge Dot */}
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-800">
              <svg
                className="h-2.5 w-2.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>

          <div className="space-y-1.5 min-w-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium tracking-wide bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 uppercase">
              {tutor.role || "Private Tutor"}
            </span>
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
              {tutor.name}
            </h3>
          </div>
        </div>

        {/* Info Rows */}
        <div className="mt-6 space-y-3 dynamic-info">
          {tutor.email && (
            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h3a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="truncate font-medium" title={tutor.email}>
                {tutor.email}
              </span>
            </div>
          )}

          {tutor.phone && (
            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72.13.13 0 01-.02.1l-1.6 3.61a1 1 0 01-1.17.55l-1.28-.3A8.962 8.962 0 0010 13.01l1.27-.3a1 1 0 011.17.55l1.6 3.61a1 1 0 01-.02.1l-.34.68a1 1 0 01-.64.55L19 21a2 2 0 01-2-2v-3.28a1 1 0 01.72-.94l3.61-1.6a1 1 0 011.17.55l.3.28a8.962 8.962 0 00-5.46-5.46l.3-1.28a1 1 0 01-.55-1.17l-1.6-3.61a1 1 0 01-.1-.02L5 3a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="font-semibold tracking-wide">{tutor.phone}</span>
            </div>
          )}

          {tutor.uid && (
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <span className="font-mono text-[11px] bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-700/50">
                ID:{" "}
                {tutor.uid.length > 12
                  ? `${tutor.uid.slice(0, 6)}...${tutor.uid.slice(-4)}`
                  : tutor.uid}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          // to={`/messages/${tutor.uid}`}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Chat
        </Link>

        <Link
          // to={`/tutors/${tutor.uid}`}
          className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-lime-500 hover:from-lime-600 hover:to-emerald-700 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200"
        >
          Hire Tutor
          <svg
            className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const LatestTutorsSection = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tuitionsbd.vercel.app/users/latest-tutors")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 flex flex-col gap-5 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-gray-700" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3.5 w-1/3 rounded bg-slate-200 dark:bg-gray-700" />
                    <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-gray-700" />
                  </div>
                </div>
                <div className="space-y-3 mt-2">
                  <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-gray-700" />
                  <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="h-10 rounded-xl bg-slate-200 dark:bg-gray-700" />
                  <div className="h-10 rounded-xl bg-slate-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 dark:text-gray-500 text-lg font-medium">
        😕 No Tutors Found At the Moment
      </div>
    );
  }

  return (
    <section className="py-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Cards Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard key={tutor.uid} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTutorsSection;
