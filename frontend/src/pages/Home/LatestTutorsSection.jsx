import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

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
      <section className="py-20 bg-indigo-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow animate-pulse overflow-hidden"
            >
              <div className="h-56 bg-gray-300 dark:bg-gray-700" />
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded" />
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded" />
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <div
              data-aos="fade-up"
              key={tutor._id}
              className="group bg-white dark:bg-gray-800
                rounded-2xl shadow-md hover:shadow-xl
                border border-transparent dark:border-gray-700
                transition duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                {tutor.image ? (
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="h-56 w-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="h-56 w-full flex items-center justify-center bg-indigo-500 dark:bg-indigo-700 text-white text-4xl font-bold">
                    {tutor.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {tutor.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  📘 Subject:{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {tutor.subjects || "Unknown"}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  🎓 Qualification:{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {tutor.education || "Unknown"}
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  📍 Location:{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {tutor.location || "Unknown"}
                  </span>
                </p>

                <Link to={`/tutors/${tutor._id}`}>
                  <button
                    className="mt-4 w-full bg-lime-500 hover:bg-lime-600
                    dark:bg-lime-600 dark:hover:bg-lime-500
                    text-white font-semibold py-2.5 rounded-xl
                    transition duration-300 shadow-md hover:shadow-lg"
                  >
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTutorsSection;
