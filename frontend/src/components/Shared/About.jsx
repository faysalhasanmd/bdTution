import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiEdit,
  FiUsers,
  FiZap,
  FiShield,
  FiCreditCard,
  FiBarChart2,
  FiLayers,
  FiSmartphone,
} from "react-icons/fi";

const About = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    fetch("https://bdtutionsf.vercel.app/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  const steps = [
    {
      icon: <FiEdit size={26} />,
      step: "01",
      title: "Post Tuition",
      desc: "Create a tuition request in minutes — subject, class, location, and budget.",
    },
    {
      icon: <FiUsers size={26} />,
      step: "02",
      title: "Connect",
      desc: "Verified tutors browse opportunities and apply directly to your post.",
    },
    {
      icon: <FiZap size={26} />,
      step: "03",
      title: "Start Learning",
      desc: "Review applicants, hire the best fit, and begin your learning journey.",
    },
  ];

  const features = [
    { icon: <FiEdit size={18} />, label: "Easy tuition posting system" },
    { icon: <FiShield size={18} />, label: "Verified & skilled tutors" },
    { icon: <FiCreditCard size={18} />, label: "Secure payment integration" },
    { icon: <FiBarChart2 size={18} />, label: "Smart admin dashboard" },
    { icon: <FiLayers size={18} />, label: "Role-based access system" },
    { icon: <FiSmartphone size={18} />, label: "Fast & responsive UI" },
  ];

  const statItems = [
    { value: stats ? `${stats.students}+` : "...", label: "Students Joined" },
    { value: stats ? `${stats.tutors}+` : "...", label: "Active Tutors" },
    {
      value: stats ? `${stats.approvedTuitions}+` : "...",
      label: "Tuitions Posted",
    },
    {
      value: stats ? `${stats.totalApplications}+` : "...",
      label: "Applications Sent",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* ── Intro ── */}
      <section
        data-aos="fade-up"
        className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center"
      >
        <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
          About TuitionHub
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-5">
          A Better Way to Find Tutors
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed">
          Finding the right tutor shouldn't be complicated. TuitionHub
          simplifies everything — from posting tuition requests to hiring the
          best tutor — all in one trusted platform.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </div>
      </section>

      {/* ── Stats — real backend data ── */}
      <section
        data-aos="fade-up"
        className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 py-14 transition-colors duration-300"
      >
        <div className="max-w-5xl mx-auto px-6">
          {/* Grid Container: মাঝখানের ডিভাইডার লাইনের কালার */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xs">
            {statItems.map((stat, i) => {
              // ৪টি বক্সের আলাদা আলাদা স্মুথ কালার ম্যাপ
              const boxColors = [
                {
                  bg: "bg-blue-50/40 dark:bg-blue-950/10 hover:bg-blue-50/80 dark:hover:bg-blue-950/20",
                  text: "text-blue-600 dark:text-blue-400",
                  pulse:
                    "from-blue-200 to-blue-300 dark:from-blue-900 dark:to-blue-800",
                },
                {
                  bg: "bg-violet-50/40 dark:bg-violet-950/10 hover:bg-violet-50/80 dark:hover:bg-violet-950/20",
                  text: "text-violet-600 dark:text-violet-400",
                  pulse:
                    "from-violet-200 to-violet-300 dark:from-violet-900 dark:to-violet-800",
                },
                {
                  bg: "bg-emerald-50/40 dark:bg-emerald-950/10 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/20",
                  text: "text-emerald-600 dark:text-emerald-400",
                  pulse:
                    "from-emerald-200 to-emerald-300 dark:from-emerald-900 dark:to-emerald-800",
                },
                {
                  bg: "bg-amber-50/40 dark:bg-amber-950/10 hover:bg-amber-50/80 dark:hover:bg-amber-950/20",
                  text: "text-amber-600 dark:text-amber-400",
                  pulse:
                    "from-amber-200 to-amber-300 dark:from-amber-900 dark:to-amber-800",
                },
              ];

              const c = boxColors[i % boxColors.length];

              return (
                <div
                  key={i}
                  className={`${c.bg} flex flex-col items-center justify-center py-10 px-4 text-center transition-all duration-300 group`}
                >
                  {/* Stat Value */}
                  <span
                    className={`text-3xl md:text-4xl font-black tracking-tight tabular-nums transition-all duration-500 ${c.text} ${
                      !stats
                        ? `animate-pulse bg-clip-text text-transparent bg-gradient-to-r ${c.pulse}`
                        : ""
                    }`}
                  >
                    {stat.value}
                  </span>

                  {/* Stat Label */}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2.5 font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section data-aos="fade-up" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 text-center transition-shadow hover:shadow-md"
            >
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <span className="text-xs font-black text-blue-400 tracking-widest uppercase">
                Step {s.step}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2">
                {s.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section
        data-aos="fade-up"
        className="bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700 py-20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
              Why TuitionHub
            </span>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Why Choose Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-600 transition-colors"
              >
                <div className="w-9 h-9 shrink-0 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-500 dark:text-blue-400">
                  {f.icon}
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Developer credit ── */}
      <section data-aos="fade-up" className="py-12 text-center">
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          Built with ❤️ by{" "}
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            Md Faysal Hasan
          </span>
        </p>
      </section>
    </div>
  );
};

export default About;
