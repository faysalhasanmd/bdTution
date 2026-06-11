import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const MarqueeTuition = ({ tuitions }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="mt-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl text-blue-500 md:text-4xl font-bold relative inline-block pb-3">
          Our All Tuition
          <span className="absolute left-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
        </h2>
      </div>
      <Marquee speed={46} pauseOnHover gradient={false}>
        <div className="flex gap-8">
          {tuitions?.map((tuition) => (
            <div
              key={tuition._id}
              className="min-w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  loading="lazy"
                  src={tuition.image}
                  alt="tuition"
                  className="w-full h-44 object-cover"
                />

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  {tuition.subject}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2">
                  {tuition.title}
                </h3>

                {/* Info */}
                <div className="text-sm text-gray-500 space-y-1 mb-3">
                  <p>📍 {tuition.location}</p>
                  <p>👨‍🎓 Class: {tuition.class}</p>
                  <p>💰 {tuition.budget}৳ / month</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                    Available
                  </span>

                  <Link
                    to={`/tuition/${tuition._id}`}
                    className="mt-auto inline-block text-center py-2 px-4 bg-lime-500 text-white font-medium rounded-lg hover:bg-lime-600 transition-colors"
                  >
                    view
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeTuition;
