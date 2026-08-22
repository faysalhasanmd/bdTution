import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Tuition from "../../components/Home/Tuition";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import HeroSection from "./HeroSection";
import LatestTuitionSection from "./LatestTuitionSection";
import LatestTutorsSection from "./LatestTutorsSection";
import About from "../../components/Shared/About";
import Marquee from "react-fast-marquee";
import MarqueeTuition from "./MarqueeTuition";
import AllTutor from "./AllTutor";
import {
  FiSearch,
  FiUserCheck,
  FiBookOpen,
  FiShield,
  FiClock,
  FiStar,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// ─────────────────────────────────────────
// Reusable Section Header
// ─────────────────────────────────────────
const SectionHeader = ({ badge, title, subtitle }) => (
  <div className="text-center py-14 px-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
    <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
      {badge}
    </span>
    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
      {title}
    </h2>
    <p className="mt-3 text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
      {subtitle}
    </p>
    <div className="mt-5 flex justify-center">
      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
    </div>
  </div>
);

// ─────────────────────────────────────────
// 1. Statistics Section — real backend data
// ─────────────────────────────────────────
const StatisticsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [dashStats, setDashStats] = useState(null);

  useEffect(() => {
    fetch("https://bdtutionsf.vercel.app/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setDashStats(data))
      .catch((err) => console.error(err));
  }, []);

  const statItems = [
    {
      value: dashStats?.tutors ?? 0,
      suffix: "+",
      label: "Active Tutors",
      icon: "👨‍🏫",
    },
    {
      value: dashStats?.students ?? 0,
      suffix: "+",
      label: "Students Enrolled",
      icon: "🎓",
    },
    {
      value: dashStats?.approvedTuitions ?? 0,
      suffix: "+",
      label: "Approved Tuitions",
      icon: "📋",
    },
    {
      value: dashStats?.totalApplications ?? 0,
      suffix: "+",
      label: "Total Applications",
      icon: "📨",
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-10 bg-blue-300 dark:bg-blue-700" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Platform at a Glance
          </span>
          <div className="h-px w-10 bg-blue-300 dark:bg-blue-700" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((stat, i) => {
            const colors = [
              {
                bg: "bg-blue-50 dark:bg-blue-900/20",
                border: "border-blue-100 dark:border-blue-800",
                icon: "text-blue-500 dark:text-blue-400",
                ring: "border-blue-200 dark:border-blue-700",
                bar: "bg-blue-400",
                num: "text-blue-700 dark:text-blue-300",
              },
              {
                bg: "bg-violet-50 dark:bg-violet-900/20",
                border: "border-violet-100 dark:border-violet-800",
                icon: "text-violet-500 dark:text-violet-400",
                ring: "border-violet-200 dark:border-violet-700",
                bar: "bg-violet-400",
                num: "text-violet-700 dark:text-violet-300",
              },
              {
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
                border: "border-emerald-100 dark:border-emerald-800",
                icon: "text-emerald-500 dark:text-emerald-400",
                ring: "border-emerald-200 dark:border-emerald-700",
                bar: "bg-emerald-400",
                num: "text-emerald-700 dark:text-emerald-300",
              },
              {
                bg: "bg-amber-50 dark:bg-amber-900/20",
                border: "border-amber-100 dark:border-amber-800",
                icon: "text-amber-500 dark:text-amber-400",
                ring: "border-amber-200 dark:border-amber-700",
                bar: "bg-amber-400",
                num: "text-amber-700 dark:text-amber-300",
              },
            ];
            const c = colors[i];

            return (
              <div
                key={i}
                className={`${c.bg} ${c.border} border rounded-2xl flex flex-col items-center gap-2 py-8 px-4 transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-12 h-12 rounded-full border ${c.ring} flex items-center justify-center ${c.icon}`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-3xl md:text-4xl font-extrabold tabular-nums ${c.num}`}
                >
                  {inView && dashStats ? (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <div className={`w-8 h-0.5 rounded-full ${c.bar}`} />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-snug">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// 2. How It Works Section
// ─────────────────────────────────────────
const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: <FiSearch size={28} />,
      title: "Post Your Need",
      desc: "Tell us what subject, class level, and location you need. Takes less than 2 minutes.",
    },
    {
      step: "02",
      icon: <FiUserCheck size={28} />,
      title: "Get Matched",
      desc: "We connect you with verified, qualified tutors who fit your requirements perfectly.",
    },
    {
      step: "03",
      icon: <FiBookOpen size={28} />,
      title: "Start Learning",
      desc: "Begin classes at your preferred time and location. Learn at your own pace.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <SectionHeader
        badge="Simple Process"
        title="How It Works"
        subtitle="Get started with TuitionHub in 3 easy steps — no hassle, no confusion."
      />
      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 z-0" />

          {steps.map((s, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
                {s.icon}
              </div>
              <span className="text-xs font-black text-blue-500 tracking-widest uppercase">
                Step {s.step}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-3">
                {s.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// 3. Categories Section
// ─────────────────────────────────────────
const CategoriesSection = () => {
  const categories = [
    { label: "Mathematics", icon: "📐", count: "120+ tutors" },
    { label: "English", icon: "📖", count: "95+ tutors" },
    { label: "Physics", icon: "⚛️", count: "80+ tutors" },
    { label: "Chemistry", icon: "🧪", count: "70+ tutors" },
    { label: "DSA", icon: "🧬", count: "65+ tutors" },
    { label: "Cyber Security", icon: "💻", count: "55+ tutors" },
    { label: "Python", icon: "🎓", count: "100+ tutors" },
    { label: "Web", icon: "🏫", count: "90+ tutors" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <SectionHeader
        badge="Browse By Subject"
        title="Popular Categories"
        subtitle="Find tutors by subject or class level — whatever you need, we have it covered."
      />
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              to={`/all-tuitions?subject=${encodeURIComponent(cat.label)}`}
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 60}
              className="group cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 border border-gray-100 dark:border-gray-600 rounded-2xl p-5 text-center transition-all duration-300"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-white text-sm">
                {cat.label}
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-300 group-hover:text-blue-100 mt-1">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// 4. Features Section
// ─────────────────────────────────────────
const FeaturesSection = () => {
  const features = [
    {
      icon: <FiShield size={24} />,
      title: "Verified Tutors",
      desc: "Every tutor is manually reviewed and verified before appearing on the platform.",
    },
    {
      icon: <FiStar size={24} />,
      title: "Top Rated Only",
      desc: "Student reviews help surface the best tutors so you never waste time.",
    },
    {
      icon: <FiClock size={24} />,
      title: "Flexible Timing",
      desc: "Schedule sessions at your convenience — morning, afternoon, or evening.",
    },
    {
      icon: <FiBookOpen size={24} />,
      title: "All Subjects",
      desc: "From SSC to HSC to university level — we cover every subject you need.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <SectionHeader
        badge="Why TuitionHub"
        title="Platform Features"
        subtitle="We built TuitionHub to make finding the right tutor simple, safe, and fast."
      />
      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              data-aos="fade-right"
              data-aos-delay={i * 100}
              className="flex gap-5 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
            >
              <div className="w-12 h-12 shrink-0 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {f.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// 5. Testimonials Section
// ─────────────────────────────────────────
const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Raihan Ahmed",
      role: "SSC Student, Dhaka",
      avatar: "RA",
      rating: 5,
      text: "Found an amazing math tutor within 24 hours. My exam scores improved dramatically after just 3 months of tutoring.",
    },
    {
      name: "Fatima Khanam",
      role: "Parent, Chittagong",
      avatar: "FK",
      rating: 5,
      text: "TuitionHub made it so easy to find a verified tutor for my daughter. The platform is simple and trustworthy.",
    },
    {
      name: "Mehedi Hasan",
      role: "HSC Student, Sylhet",
      avatar: "MH",
      rating: 5,
      text: "The tutor I found here helped me understand Physics like never before. Highly recommend this platform.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <SectionHeader
        badge="Student Reviews"
        title="What Students Say"
        subtitle="Real reviews from real students and parents across Bangladesh."
      />
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-100 dark:border-gray-600"
            >
              <div className="flex gap-1 mb-4">
                {Array(r.rating)
                  .fill(0)
                  .map((_, j) => (
                    <FiStar
                      key={j}
                      size={14}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400">
                    {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// 6. FAQ Section
// ─────────────────────────────────────────
const FAQSection = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "How do I find a tutor on TuitionHub?",
      a: "Simply post your tuition need with subject, class level, and location. Our platform will match you with verified tutors in your area within hours.",
    },
    {
      q: "Are the tutors verified?",
      a: "Yes. Every tutor goes through a manual verification process before their profile goes live on TuitionHub. We check credentials and reviews carefully.",
    },
    {
      q: "How much does a tutor cost?",
      a: "Tutor fees vary based on subject, class level, and experience. You can discuss and negotiate the rate directly with the tutor after matching.",
    },
    {
      q: "Can I post a tuition need for free?",
      a: "Yes, posting a tuition need is completely free. You only connect with tutors who match your requirements.",
    },
    {
      q: "What subjects are available?",
      a: "We cover all major subjects including Mathematics, English, Physics, Chemistry, Biology, ICT, and more — from primary to HSC level.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <SectionHeader
        badge="Common Questions"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before getting started."
      />
      <div className="max-w-3xl mx-auto px-6 mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 60}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                {faq.q}
              </span>
              <span className="text-blue-500 shrink-0 ml-4">
                {open === i ? (
                  <FiChevronUp size={18} />
                ) : (
                  <FiChevronDown size={18} />
                )}
              </span>
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// 7. Call To Action Section
// ─────────────────────────────────────────
const CallToActionSection = () => (
  <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
    </div>
    <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
      <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
        Get Started Today
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
        Ready to Find Your Perfect Tutor?
      </h2>
      <p className="text-blue-100 text-base md:text-lg mb-10 leading-relaxed">
        Join thousands of students across Bangladesh who are already learning
        smarter with TuitionHub.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/post-tuition"
          className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-2xl transition-colors text-sm"
        >
          Post a Tuition Need
        </a>
        <a
          href="/tutors"
          className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-2xl transition-colors text-sm"
        >
          Browse All Tutors
        </a>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────
// Main Home Component
// ─────────────────────────────────────────
const Home = () => {
  const [approvedTuitions, setApprovedTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const res = await fetch(
          "https://bdtutionsf.vercel.app/tuition?status=Approved",
        );
        const data = await res.json();
        setApprovedTuitions(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchTuitions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Notice Marquee */}
      <div className="mt-8 px-4" data-aos="fade-up">
        <div className="rounded-xl py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 overflow-hidden">
          <Marquee speed={50} pauseOnHover gradient={false}>
            <div className="flex items-center gap-10 px-6">
              <span className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-full text-xs tracking-wider shrink-0">
                📢 Notice
              </span>
              <p className="text-sm md:text-base font-medium text-blue-800 dark:text-blue-200 whitespace-nowrap">
                Tuition is a type of private education. Students attend classes
                with a tutor, where they receive one-on-one guidance and
                personalized support.
              </p>
            </div>
          </Marquee>
        </div>
      </div>

      {/* 3. Statistics — trust signal right after hero */}
      <div data-aos="fade-up">
        <StatisticsSection />
      </div>

      {/* 4. How It Works */}
      <div data-aos="fade-up">
        <HowItWorksSection />
      </div>

      {/* 5. Categories */}
      <div data-aos="fade-up">
        <CategoriesSection />
      </div>

      {/* 6. Latest Tuitions */}
      <section data-aos="fade-up" className="mt-10">
        <SectionHeader
          badge="Fresh Posts"
          title="Latest Tuition Opportunities"
          subtitle="Check out the most recent tuition posts from students."
        />
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 py-10">
          <div className="mx-auto px-6">
            <LatestTuitionSection />
          </div>
        </div>
      </section>

      {/* 7. Features */}
      <div data-aos="fade-up">
        <FeaturesSection />
      </div>

      {/* 8. Latest Tutors */}
      <section data-aos="fade-up" className="mt-10">
        <SectionHeader
          badge="Top Rated"
          title="Meet Our Expert Tutors"
          subtitle="Find the perfect companion for your educational journey. Private instruction tailored completely to your needs.."
        />
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 py-14">
          <div className="mx-auto px-6">
            <LatestTutorsSection />
          </div>
        </div>
      </section>

      {/* 9. All Tutors Marquee */}
      <section data-aos="fade-up" className="mt-10">
        <SectionHeader
          badge="Browse All"
          title="Meet Our Tutors"
          subtitle="Hundreds of verified tutors ready to help you learn."
        />
        <AllTutor />
      </section>

      {/* 10. Testimonials */}
      <div data-aos="fade-up">
        <TestimonialsSection />
      </div>

      {/* 11. Verified Tuitions */}
      <section data-aos="fade-up" className="mt-10">
        <SectionHeader
          badge="Verified"
          title="Verified Tuition Opportunities"
          subtitle="Explore approved tuition postings and connect with students."
        />
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl py-14">
          <div className="mx-auto px-6">
            <Tuition tuitions={approvedTuitions} />
          </div>
        </div>
      </section>

      {/* 12. Tuition Marquee */}
      <section data-aos="fade-up">
        <MarqueeTuition tuitions={approvedTuitions} />
      </section>

      {/* 13. FAQ */}
      <div data-aos="fade-up">
        <FAQSection />
      </div>

      {/* 14. About */}
      <section data-aos="fade-up" className="mt-10">
        <About />
      </section>

      <div data-aos="fade-up">
        <CallToActionSection />
      </div>
    </div>
  );
};

export default Home;
