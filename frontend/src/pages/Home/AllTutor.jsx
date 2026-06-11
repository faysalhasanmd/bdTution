import { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { Link } from "react-router";

const AllTutor = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axios
      .get("https://tuitionsbd.vercel.app/users/tutors")
      .then((res) => setTutors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="py-6 bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-900">
      <Marquee speed={46} pauseOnHover gradient={false}>
        <div className="flex gap-5 px-6">
          {tutors.map((tutor) => (
            <Link
              to={`/tutors/${tutor._id}`}
              key={tutor._id}
              className="flex-shrink-0"
            >
              <div
                className="group bg-white dark:bg-gray-800
                border border-transparent dark:border-gray-700
                rounded-2xl shadow-lg hover:shadow-2xl
                transition duration-300 overflow-hidden min-w-[320px] cursor-pointer"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    loading="lazy"
                    src={tutor.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={tutor.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-indigo-500 dark:bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
                    Top Tutor
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {tutor.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📘 {tutor.subjects || "All Subjects"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    🎓 {tutor.education || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📍 {tutor.location || "Bangladesh"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    💼 {tutor.experience || "Experienced Tutor"}
                  </p>

                  <button
                    className="mt-3 w-full bg-lime-500 hover:bg-lime-600
                    dark:bg-lime-600 dark:hover:bg-lime-500
                    text-white text-sm font-semibold py-2.5 rounded-lg
                    transition duration-300 shadow-md hover:shadow-lg"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default AllTutor;
