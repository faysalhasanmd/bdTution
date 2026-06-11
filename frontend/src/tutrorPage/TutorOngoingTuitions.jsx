import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { AuthContext } from "../providers/AuthContext";

const TutorOngoingTuitions = () => {
  const { user } = useContext(AuthContext);
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetch(`https://bdtuitions.vercel.app/tutor/ongoing/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTuitions(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 mt-9 min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Title */}
      <div className="mb-8 text-center">
        <span className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 rounded-full mb-2 md:mb-3 tracking-widest uppercase">
          Dashboard
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Tutor Ongoing Tuitions
        </h1>
        <p className="text-gray-400 dark:text-gray-500 mt-1 md:mt-3 text-sm md:text-base">
          All your active and accepted tuition sessions
        </p>
      </div>

      {/* Empty State */}
      {tuitions.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            😔 No Accepted Tuitions Found
          </h3>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            Once a student accepts and completes payment, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="group bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-3xl shadow-lg hover:shadow-2xl
                hover:-translate-y-2 transition-all duration-300
                p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="max-w-[70%]">
                  <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                    {tuition.tutorName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 break-words mt-1">
                    {tuition.tutorEmail}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    tuition.status === "Pending"
                      ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400"
                      : tuition.status === "Accepted"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400"
                  }`}
                >
                  {tuition.status === "Pending"
                    ? "Pending"
                    : tuition.status === "Accepted"
                      ? "Active"
                      : "Closed"}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  🎓{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Qualification:
                  </span>{" "}
                  {tuition.qualification || "Not Provided"}
                </p>
                <p className="flex items-center gap-2">
                  💰{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Salary:
                  </span>{" "}
                  ৳{tuition.expectedSalary}
                </p>
                <p className="flex items-center gap-2">
                  📅{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Applied:
                  </span>{" "}
                  {tuition.appliedAt
                    ? new Date(tuition.appliedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Footer Button */}
              <div className="mt-6">
                <button
                  className="w-full bg-gradient-to-r from-lime-500 to-lime-600
                  hover:from-lime-600 hover:to-lime-700
                  text-white py-2 rounded-xl font-semibold
                  hover:scale-105 transition-all duration-300 shadow-md"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorOngoingTuitions;
