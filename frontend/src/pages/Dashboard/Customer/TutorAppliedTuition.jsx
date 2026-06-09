import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const TutorAppliedTuition = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const defaultAvatar = "https://i.ibb.co/4pDNDk1/avatar.png";

  useEffect(() => {
    if (!userEmail) return;
    setLoading(true);
    fetch(`https://tuitionsbd.vercel.app/applications/student/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(data.reverse());
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load applications");
        setLoading(false);
      });
  }, [userEmail]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `https://tuitionsbd.vercel.app/applications/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app,
          ),
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handlePayment = async (app) => {
    try {
      const res = await fetch(
        "https://tuitionsbd.vercel.app/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(app),
        },
      );
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create payment session");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-7 text-gray-900 dark:text-white relative">
          Applied Tutors
          <span className="block w-24 h-1 bg-indigo-500 mx-auto mt-3 rounded-full" />
        </h2>

        {error && <p className="text-center text-red-500 mb-6">{error}</p>}

        {applications.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No tutor applications yet.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="group bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  rounded-2xl shadow-md hover:shadow-2xl
                  hover:-translate-y-1 transition-all duration-300
                  p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-lime-200 dark:border-lime-700 shadow-sm group-hover:scale-105 transition">
                      <img
                        src={app.tutorImage || defaultAvatar}
                        alt={app.tutorName}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = defaultAvatar)}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {app.tutorName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {app.tutorEmail}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <p>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Qualification:
                      </span>{" "}
                      {app.qualification}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Experience:
                      </span>{" "}
                      {app.experience || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Expected Salary:
                      </span>{" "}
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        {app.expectedSalary} BDT
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    📊 Status:
                  </span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === "Accepted"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400"
                        : app.status === "Rejected"
                          ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
                          : "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {app.status === "Accepted"
                      ? "✅ Accepted"
                      : app.status === "Rejected"
                        ? "❌ Rejected"
                        : "⏳ Pending"}
                  </span>
                </div>

                {/* Buttons */}
                {app.status === "Pending" && (
                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-green-400 to-green-600 hover:scale-105 transition text-white py-2 rounded-xl text-sm font-semibold shadow"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "Rejected")}
                      className="flex-1 bg-gradient-to-r from-red-400 to-red-600 hover:scale-105 transition text-white py-2 rounded-xl text-sm font-semibold shadow"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Payment Modal */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
              onClick={() => setShowModal(false)}
            />
            <div
              className="relative bg-white dark:bg-gray-800
              border border-gray-100 dark:border-gray-700
              rounded-xl shadow-xl p-6 w-full max-w-md z-50"
            >
              {/* Title */}
              <div className="flex flex-col items-center mb-5">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white tracking-wide">
                  Confirm Payment
                </h3>
                <div className="w-24 h-[3px] bg-lime-400 rounded-full mt-2" />
              </div>

              {/* Content */}
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span className="font-medium">Tutor</span>
                  <span>{selectedApp.tutorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email</span>
                  <span className="text-right break-all">
                    {selectedApp.tutorEmail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Salary</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {selectedApp.expectedSalary} BDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tuition ID</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {selectedApp.tuitionId}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePayment(selectedApp)}
                  className="px-5 py-2 rounded-lg bg-lime-500 hover:bg-lime-600 text-white font-medium shadow-sm transition"
                >
                  Pay & Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorAppliedTuition;
