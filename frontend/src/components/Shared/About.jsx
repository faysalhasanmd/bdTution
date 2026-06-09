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
    fetch("https://tuitionsbd.vercel.app/admin/dashboard-stats")
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
        className="bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700 py-14"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            {statItems.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <span
                  className={`text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums transition-all duration-500 ${
                    !stats
                      ? "animate-pulse text-gray-300 dark:text-gray-600"
                      : ""
                  }`}
                >
                  {stat.value}
                </span>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
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
