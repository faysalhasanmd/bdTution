import React, { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
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
  const [payLoading, setPayLoading] = useState(false);

  const defaultAvatar = "https://i.ibb.co/4pDNDk1/avatar.png";

  useEffect(() => {
    if (!userEmail) return;
    setLoading(true);
    fetch(`https://bdtutionsf.vercel.app/applications/student/${userEmail}`)
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
        `https://bdtutionsf.vercel.app/applications/${id}`,
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
    setPayLoading(true);
    try {
      const res = await fetch(
        "https://bdtutionsf.vercel.app/create-checkout-session",
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
    } finally {
      setPayLoading(false);
    }
  };

  // Get initials from tutor name
  const getInitials = (name = "") =>
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();

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
                        loading="lazy"
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
                    Status:
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
                      className="w-full py-1.5 mt-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition-colors flex justify-center items-center"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "Rejected")}
                      className="w-full py-1.5 mt-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors flex justify-center items-center"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Payment Modal ── */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => !payLoading && setShowModal(false)}
            />

            {/* Modal card */}
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-md z-50 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-lime-400 to-emerald-500" />

              <div className="p-6">
                {/* Header row */}
                <div className="flex items-center gap-3 mb-5">
                  {/* Avatar / Initials */}
                  <div className="w-12 h-12 rounded-full bg-lime-100 dark:bg-lime-900/40 flex items-center justify-center text-lime-700 dark:text-lime-400 font-bold text-sm flex-shrink-0 border-2 border-lime-200 dark:border-lime-700">
                    {getInitials(selectedApp.tutorName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white leading-tight truncate">
                      {selectedApp.tutorName}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {selectedApp.tutorEmail}
                    </p>
                  </div>
                  {/* Close button */}
                  <button
                    onClick={() => !payLoading && setShowModal(false)}
                    disabled={payLoading}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition disabled:opacity-40 flex-shrink-0"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Info notice */}
                <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 text-blue-700 dark:text-blue-300 text-xs rounded-xl px-4 py-3 mb-5 leading-relaxed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"
                    />
                  </svg>
                  <span>
                    Payment is processed securely via Stripe. Once paid, the
                    tutor's status will update to <strong>Accepted</strong>{" "}
                    automatically.
                  </span>
                </div>

                {/* Details list */}
                <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl divide-y divide-gray-200 dark:divide-gray-600/60 px-4 mb-6">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Qualification
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-right">
                      {selectedApp.qualification}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Experience
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-right">
                      {selectedApp.experience || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Salary
                    </span>
                    <span className="text-base font-bold text-green-600 dark:text-green-400">
                      ৳ {selectedApp.expectedSalary} BDT
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"
                        />
                      </svg>
                      Tuition ID
                    </span>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                      {selectedApp.tuitionId}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={payLoading}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePayment(selectedApp)}
                    disabled={payLoading}
                    className="flex-[2] py-2.5 rounded-xl bg-lime-500 hover:bg-lime-600 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {payLoading ? (
                      <>
                        <TbFidgetSpinner className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Pay &amp; Accept
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorAppliedTuition;
