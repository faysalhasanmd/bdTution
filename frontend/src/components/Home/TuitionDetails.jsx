import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AuthContext } from "../../providers/AuthContext";
import useRole from "../../hooks/useRole";

const StarRating = ({ rating = 0, max = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>
        ★
      </span>
    ))}
  </div>
);

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Rahim Uddin",
    avatar: "RU",
    rating: 5,
    date: "2 days ago",
    text: "Very professional and dedicated student. The schedule works perfectly and location is convenient.",
  },
  {
    id: 2,
    name: "Sumaiya Akter",
    avatar: "SA",
    rating: 4,
    date: "1 week ago",
    text: "Great opportunity for experienced tutors. The budget is reasonable for the subject level.",
  },
  {
    id: 3,
    name: "Farhan Islam",
    avatar: "FI",
    rating: 5,
    date: "2 weeks ago",
    text: "Applied and got selected. The student is very cooperative and eager to learn.",
  },
];

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [related, setRelated] = useState([]);

  const { user } = useContext(AuthContext);
  const [role] = useRole();

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const res = await fetch(`https://bdtutionsf.vercel.app/tuition/${id}`);
        const data = await res.json();
        setTuition(data);

        // Fetch related tuitions from DB — same subject, exclude current
        try {
          const relRes = await fetch(
            `https://bdtutionsf.vercel.app/tuition?status=Approved`,
          );
          const relData = await relRes.json();
          const filtered = relData
            .filter((t) => t._id !== id && t.subject === data.subject)
            .slice(0, 3);
          setRelated(filtered);
        } catch (_) {
          // related fetch failing should not break the page
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTuition();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const applicationData = {
      tuitionId: id,
      studentName: tuition?.studentName,
      location: tuition?.location,
      subject: tuition?.subject,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      qualification: form.qualification.value,
      experience: form.experience.value,
      expectedSalary: form.expectedSalary.value,
      status: "Pending",
      appliedAt: new Date(),
    };
    try {
      const res = await fetch("https://bdtutionsf.vercel.app/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      if (res.ok) {
        alert("✅ Application Submitted!");
        setOpen(false);
        form.reset();
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );

  if (!tuition)
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold text-gray-500">
        ❌ Tuition not found
      </div>
    );

  const images = tuition.images?.length
    ? tuition.images
    : [
        tuition.image ||
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
      ];

  const avgRating = (
    MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length
  ).toFixed(1);

  const TABS = ["overview", "specifications", "reviews"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back */}
      <button
        onClick={() => navigate("/all-tuitions")}
        className="mb-6 flex items-center gap-2 text-sm font-medium bg-lime-300 hover:bg-lime-600 text-black mx-3 py-2 rounded px-3 transition"
      >
        ← Back
      </button>

      {/* ── Image Gallery ─────────────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg mb-8">
        <div className="relative h-72 sm:h-96 overflow-hidden bg-gray-100 group">
          <img
            loading="lazy"
            src={images[activeImg]}
            alt={tuition.subject}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-5 left-6">
            <span className="inline-block bg-lime-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
              {tuition.subject}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {tuition.studentName}
            </h1>
            <p className="text-gray-300 text-sm mt-0.5">
              📍 {tuition.location}
            </p>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImg((p) => (p - 1 + images.length) % images.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/70 transition flex items-center justify-center text-lg"
              ></button>
              <button
                onClick={() => setActiveImg((p) => (p + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/70 transition flex items-center justify-center text-lg"
              ></button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-white overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                  i === activeImg
                    ? "border-lime-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Quick Stats Row ───────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { icon: "💰", label: "Budget", value: `${tuition.budget} Tk/mo` },
          { icon: "🗓️", label: "Schedule", value: tuition.schedule },
          { icon: "🏫", label: "Class", value: tuition.class || "—" },
          { icon: "⭐", label: "Rating", value: `${avgRating} / 5` },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center shadow-sm"
          >
            <span className="text-2xl mb-1">{s.icon}</span>
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition capitalize ${
              activeTab === tab
                ? "bg-white text-lime-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Tab: Overview ────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              📝 Description
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {tuition.description || "No description provided."}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              📬 Contact
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xl">📧</span>
              <div>
                <p className="text-xs text-gray-500">Student Email</p>
                <a
                  href={`mailto:${tuition.studentEmail}`}
                  className="text-sm font-medium text-lime-600 hover:underline break-all"
                >
                  {tuition.studentEmail || "Not provided"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Specifications ──────────────────────────────── */}
      {activeTab === "specifications" && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {[
            { icon: "📖", label: "Subject", value: tuition.subject },
            { icon: "🏫", label: "Class / Level", value: tuition.class },
            {
              icon: "💰",
              label: "Budget",
              value: tuition.budget ? `${tuition.budget} Tk` : "—",
            },
            { icon: "🗓️", label: "Schedule", value: tuition.schedule },
            { icon: "📍", label: "Location", value: tuition.location },
            { icon: "📧", label: "Student Email", value: tuition.studentEmail },
            { icon: "👤", label: "Student Name", value: tuition.studentName },
          ].map((row, i, arr) => (
            <div
              key={i}
              className={`flex items-center justify-between px-6 py-4 hover:bg-lime-50 transition ${
                i !== arr.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <span className="text-lg">{row.icon}</span>
                {row.label}
              </div>
              <span className="text-sm font-medium text-gray-800 text-right max-w-[55%] break-all">
                {row.value || "—"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Reviews ─────────────────────────────────────── */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-800">{avgRating}</p>
              <StarRating rating={Math.round(avgRating)} />
              <p className="text-xs text-gray-400 mt-1">
                {MOCK_REVIEWS.length} reviews
              </p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = MOCK_REVIEWS.filter(
                  (r) => r.rating === star,
                ).length;
                const pct = Math.round((count / MOCK_REVIEWS.length) * 100);
                return (
                  <div
                    key={star}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <span className="w-3">{star}</span>
                    <span className="text-amber-400">★</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-lime-100 text-lime-700 text-xs font-semibold flex items-center justify-center">
                  {rev.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {rev.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={rev.rating} />
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {rev.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Apply Button ─────────────────────────────────────── */}
      {role === "Tutor" && (
        <button
          onClick={() => setOpen(true)}
          className="mt-8 w-full py-3.5 text-base font-semibold text-white rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-95 transition-all duration-200 shadow-md"
        >
          🚀 Apply for This Tuition
        </button>
      )}

      {/* ── Related Tuitions (DB থেকে) ───────────────────────── */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🔗 Related Tuitions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <button
                key={rel._id}
                onClick={() => {
                  navigate(`/tuition/${rel._id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-left bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
              >
                <div className="h-32 overflow-hidden bg-gray-100">
                  <img
                    loading="lazy"
                    src={
                      rel.image ||
                      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80"
                    }
                    alt={rel.subject}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <span className="text-xs font-medium text-lime-600 bg-lime-50 px-2 py-0.5 rounded-full">
                    {rel.subject}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 mt-1.5 truncate">
                    {rel.studentName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    📍 {rel.location} · 💰 {rel.budget} Tk
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Apply Modal ──────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">✍️ Apply for Tuition</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Student
                  </label>
                  <input
                    readOnly
                    value={tuition?.studentName || ""}
                    className="input input-bordered w-full text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Location
                  </label>
                  <input
                    readOnly
                    value={tuition?.location || ""}
                    className="input input-bordered w-full text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Your Name
                  </label>
                  <input
                    readOnly
                    value={user?.displayName || ""}
                    className="input input-bordered w-full text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Your Email
                  </label>
                  <input
                    readOnly
                    value={user?.email || ""}
                    className="input input-bordered w-full text-sm bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Qualification
                </label>
                <input
                  name="qualification"
                  placeholder="e.g. BSc in Mathematics"
                  required
                  className="input input-bordered w-full text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Experience
                </label>
                <input
                  name="experience"
                  placeholder="e.g. 2 years teaching SSC students"
                  required
                  className="input input-bordered w-full text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Expected Salary (Tk/mo)
                </label>
                <input
                  name="expectedSalary"
                  placeholder="e.g. 3500"
                  required
                  type="number"
                  className="input input-bordered w-full text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm rounded-lg text-white bg-lime-500 hover:bg-lime-600 transition font-medium"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
