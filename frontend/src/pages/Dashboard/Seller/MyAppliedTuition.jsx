import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";

const MyAppliedTuition = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  const fetchApplications = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://bdtuitions.vercel.app/applications/tutor/${user.email}`,
      );
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    const res = await fetch(
      `https://bdtuitions.vercel.app/applications/${id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    if (data.deletedCount > 0) {
      setApplications((prev) => prev.filter((a) => a._id !== id));
    }
  };

  const handleUpdate = async (id) => {
    if (!salary) return;
    const res = await fetch(
      `https://bdtuitions.vercel.app/applications/update/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expectedSalary: salary }),
      },
    );
    const data = await res.json();
    if (data.modifiedCount > 0) {
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? { ...a, expectedSalary: salary } : a)),
      );
      setEditingId(null);
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "Pending").length,
    accepted: applications.filter((a) => a.status === "Accepted").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-white to-purple-100 px-3 md:px-4 py-8 md:py-14">
      {/* HEADER */}
      <div data-aos="fade-down" className="text-center mb-6 md:mb-12">
        <span className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 rounded-full mb-2 md:mb-3 tracking-widest uppercase">
          Dashboard
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          My Applications
        </h1>
        <p className="text-gray-400 mt-1 md:mt-3 text-sm md:text-base">
          Track, edit and manage all your tuition applications
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 mb-6 md:mb-12 max-w-5xl mx-auto">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: "📋",
            gradient: "from-blue-600 to-indigo-600",
            shadow: "shadow-blue-200",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: "⏳",
            gradient: "from-amber-400 to-orange-500",
            shadow: "shadow-orange-200",
          },
          {
            label: "Accepted",
            value: stats.accepted,
            icon: "✅",
            gradient: "from-emerald-400 to-green-600",
            shadow: "shadow-green-200",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            icon: "❌",
            gradient: "from-rose-400 to-pink-600",
            shadow: "shadow-pink-200",
          },
        ].map((item, i) => (
          <div
            key={item.label}
            data-aos="zoom-in"
            data-aos-delay={i * 100}
            className={`relative overflow-hidden p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-lg ${item.shadow} bg-gradient-to-br ${item.gradient} text-white hover:scale-105 transition-transform duration-300 cursor-default`}
          >
            <div className="absolute -top-3 -right-3 text-4xl md:text-6xl opacity-20 select-none">
              {item.icon}
            </div>
            <p className="text-[9px] md:text-xs font-semibold uppercase tracking-widest opacity-80 mb-0.5 md:mb-1">
              {item.label}
            </p>
            <p className="text-2xl md:text-4xl font-black">{item.value}</p>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {applications.length === 0 ? (
        <div
          data-aos="fade-up"
          className="flex flex-col items-center justify-center mt-20 gap-4"
        >
          <div className="text-6xl md:text-7xl">😢</div>
          <p className="text-gray-400 text-lg md:text-xl font-medium">
            No applications found
          </p>
          <p className="text-gray-300 text-xs md:text-sm">
            Start applying for tuitions to see them here
          </p>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-6 max-w-5xl mx-auto">
          {applications.map((app, index) => (
            <div
              key={app._id}
              data-aos="fade-up"
              data-aos-delay={index * 70}
              className="group relative bg-white border border-gray-100 shadow-lg hover:shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300"
            >
              {/* LEFT COLOR BAR */}
              <div
                className={`absolute left-0 top-0 h-full w-1 md:w-1.5 rounded-l-3xl ${
                  app.status === "Pending"
                    ? "bg-gradient-to-b from-yellow-400 to-orange-400"
                    : app.status === "Accepted"
                      ? "bg-gradient-to-b from-emerald-400 to-green-500"
                      : "bg-gradient-to-b from-rose-400 to-pink-500"
                }`}
              />

              <div className="pl-4 md:pl-8 pr-3 md:pr-6 py-3 md:py-6">
                {/* TOP ROW */}
                <div className="flex justify-between items-start mb-3 md:mb-5">
                  <h3 className="text-sm md:text-xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {app.subject || "N/A"}
                  </h3>

                  <span
                    className={`flex items-center gap-1 px-2 md:px-4 py-0.5 md:py-1.5 text-[9px] md:text-xs rounded-full font-bold border ml-2 shrink-0 ${
                      app.status === "Pending"
                        ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                        : app.status === "Accepted"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-rose-50 text-rose-500 border-rose-200"
                    }`}
                  >
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full inline-block bg-current" />
                    {app.status}
                  </span>
                </div>

                {/* STUDENT NAME & LOCATION */}
                <div className="grid grid-cols-2 gap-1.5 md:gap-3 mb-2 md:mb-5">
                  <div className="flex items-center gap-1.5 md:gap-3 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-lg md:rounded-2xl px-2 md:px-4 py-1.5 md:py-3">
                    <span className="text-base md:text-2xl">👤</span>
                    <div className="min-w-0">
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Student
                      </p>
                      <p className="text-[10px] md:text-sm font-bold text-gray-800 truncate">
                        {app.studentName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 md:gap-3 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-lg md:rounded-2xl px-2 md:px-4 py-1.5 md:py-3">
                    <span className="text-base md:text-2xl">📍</span>
                    <div className="min-w-0">
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Location
                      </p>
                      <p className="text-[10px] md:text-sm font-bold text-gray-800 truncate">
                        {app.location || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-3 gap-1.5 md:gap-3 mb-2 md:mb-5">
                  <div className="flex items-center gap-1.5 md:gap-3 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-lg md:rounded-2xl px-2 md:px-4 py-1.5 md:py-3">
                    <span className="text-base md:text-2xl">💰</span>
                    <div className="min-w-0">
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Salary
                      </p>
                      <p className="text-[10px] md:text-sm font-bold text-gray-800 truncate">
                        ৳{app.expectedSalary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 md:gap-3 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-lg md:rounded-2xl px-2 md:px-4 py-1.5 md:py-3">
                    <span className="text-base md:text-2xl">💼</span>
                    <div className="min-w-0">
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Experience
                      </p>
                      <p className="text-[10px] md:text-sm font-bold text-gray-800 truncate">
                        {app.experience || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 md:gap-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-lg md:rounded-2xl px-2 md:px-4 py-1.5 md:py-3">
                    <span className="text-base md:text-2xl">🎓</span>
                    <div className="min-w-0">
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Qualification
                      </p>
                      <p className="text-[10px] md:text-sm font-bold text-gray-800 truncate">
                        {app.qualification || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EDIT INPUT */}
                {editingId === app._id && (
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-5 p-2 md:p-4 bg-indigo-50 border border-indigo-100 rounded-xl md:rounded-2xl">
                    <input
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="New salary..."
                      className="border border-indigo-200 bg-white px-3 py-1.5 rounded-lg w-32 md:w-40 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <button
                      onClick={() => handleUpdate(app._id)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 md:px-5 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold hover:scale-105 transition shadow"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-100 text-gray-500 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm hover:scale-105 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* FOOTER */}
                <div className="flex justify-between items-center pt-2 md:pt-4 border-t border-gray-100">
                  <p className="text-[9px] md:text-xs text-gray-400 flex items-center gap-1">
                    🗓️{" "}
                    <span className="font-medium text-gray-500">
                      {new Date(app.appliedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>

                  {app.status === "Pending" && (
                    <div className="flex gap-1.5 md:gap-2">
                      {editingId !== app._id && (
                        <button
                          onClick={() => {
                            setEditingId(app._id);
                            setSalary(app.expectedSalary);
                          }}
                          className="flex items-center gap-1 px-2 md:px-4 py-1 md:py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg text-[9px] md:text-xs font-semibold hover:bg-indigo-100 hover:scale-105 transition"
                        >
                          ✏️ Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="flex items-center gap-1 px-2 md:px-4 py-1 md:py-1.5 bg-rose-50 text-rose-500 border border-rose-200 rounded-lg text-[9px] md:text-xs font-semibold hover:bg-rose-100 hover:scale-105 transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppliedTuition;
