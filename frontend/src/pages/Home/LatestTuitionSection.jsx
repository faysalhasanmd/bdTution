import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const LatestTuitionSection = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://tuitionsbd.vercel.app/tuition/latest")
      .then((res) => res.json())
      .then((data) => {
        setTuitions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (tuitions.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        😕 No Latest Tuition Found
      </div>
    );
  }

  return (
    <section
      data-aos="fade-up"
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}

        {/* Grid */}
        <div className="grid mx-auto gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <div
              data-aos="fade-up"
              key={tuition._id}
              className="group bg-white dark:bg-gray-800
                border border-gray-100 dark:border-gray-700
                rounded-2xl shadow-sm hover:shadow-2xl
                hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tuition.image}
                  alt={tuition.subject}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-3 py-1 text-xs rounded-full font-medium text-gray-800 dark:text-gray-200">
                  {tuition.subject}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {tuition.subject} Tuition
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  🎓 Class:{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {tuition.class}
                  </span>
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  📍 Location:{" "}
                  <span className="text-gray-700 dark:text-gray-300">
                    {tuition.location}
                  </span>
                </p>

                <p className="text-lime-600 dark:text-lime-400 font-bold mt-1">
                  💰 ৳{tuition.budget}
                </p>

                <Link
                  to={`/tuition/${tuition._id}`}
                  className="mt-4 inline-flex items-center justify-center w-full py-2.5
                    rounded-xl bg-lime-500 hover:bg-lime-600
                    dark:bg-lime-600 dark:hover:bg-lime-500
                    text-white font-medium shadow-md
                    hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTuitionSection;
