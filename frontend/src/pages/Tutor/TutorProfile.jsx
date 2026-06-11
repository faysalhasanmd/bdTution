import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const TutorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://bdtuitions.vercel.app/users/tutors/${id}`)
      .then((res) => {
        setTutor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load tutor profile");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );

  return (
    <div className="  px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* 🔵 Header Section */}
        <div className="bg-gradient-to-r  from-indigo-600 to-blue-500 text-white p-10 text-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-5 top-5 bg-pink-200 hover:bg-pink-500 hover:text-white font-bold text-black px-4 py-1 rounded-full text-sm backdrop-blur transition"
          >
            ← Back
          </button>

          <img
            loading="lazy"
            src={tutor.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={tutor.name}
            className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-md object-cover"
          />

          <h1 className="text-3xl font-bold mt-4">{tutor.name}</h1>
          <p className="text-sm opacity-90">{tutor.email}</p>

          <span className="inline-block mt-3 px-4 py-1 text-sm bg-white/20 rounded-full backdrop-blur">
            ⭐ Professional Tutor
          </span>
        </div>

        {/* 📄 Content */}
        <div className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard title="Education" value={tutor.education} />
            <InfoCard title="Experience" value={tutor.experience} />
            <InfoCard title="Subjects" value={tutor.subjects} />
            <InfoCard title="Location" value={tutor.location} />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              About Tutor
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {tutor.about || "No additional information provided."}
            </p>
          </div>

          {/* 🚀 Action Button */}
          <button
            onClick={() =>
              Swal.fire({
                title: "Are you sure?",
                text: "You want to hire this tutor",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#6366f1",
                cancelButtonColor: "#ef4444",
                confirmButtonText: "Yes, Hire",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Success!",
                    text: "Tutor hired successfully 🎉",
                    icon: "success",
                  });
                }
              })
            }
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Hire Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable Info Card
const InfoCard = ({ title, value }) => {
  return (
    <div className="bg-gray-50 p-5 rounded-xl hover:shadow-md transition duration-300">
      <h2 className="text-sm font-semibold text-gray-500 mb-1">{title}</h2>
      <p className="text-gray-800 font-medium">{value || "Not provided"}</p>
    </div>
  );
};

export default TutorProfile;
