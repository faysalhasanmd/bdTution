import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Tutor = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://tuitionsbd.vercel.app/users/tutors")
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load tutors");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 relative inline-block">
          Meet Our All Tutors
          <span className="block w-24 h-1 bg-primary mx-auto mt-3 rounded-full"></span>
        </h1>
      </div>

      {/* Tutors Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No tutors available at the moment.
          </p>
        )}

        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
          >
            <img
              loading="lazy"
              src={tutor.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt={tutor.name}
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-primary"
            />

            <h2 className="text-xl font-semibold mt-4 text-gray-800">
              {tutor.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">{tutor.email}</p>

            <span className="inline-block mt-3 px-4 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {tutor.role}
            </span>
            <Link to={`/tutors/${tutor._id}`}>
              <button className="mt-5 w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutor;
