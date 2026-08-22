import { useState, useEffect } from "react";

const CATEGORIES = [
  "All",
  "Tips & Tricks",
  "Tutors",
  "Students",
  "Education",
  "Parenting",
  "Career",
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Find the Perfect Home Tutor for Your Child in Bangladesh",
    excerpt:
      "Choosing the right tutor can transform your child's academic journey. Here's a complete guide to what to look for — experience, subject expertise, teaching style, and affordability.",
    category: "Parenting",
    author: "Nadia Islam",
    authorAvatar: "NI",
    date: "June 5, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "5 Study Techniques That Actually Work for SSC & HSC Students",
    excerpt:
      "From Pomodoro to spaced repetition — these proven study methods can help you retain more and stress less during exam season.",
    category: "Students",
    author: "Arif Hossain",
    authorAvatar: "AH",
    date: "May 28, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    title:
      "Why Online Tutoring Is the Future of Private Education in Bangladesh",
    excerpt:
      "With internet penetration rising fast and quality tutors scattered across cities, online tuition is bridging gaps that physical distance once made impossible.",
    category: "Education",
    author: "Tania Begum",
    authorAvatar: "TB",
    date: "May 20, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "How to Build a Standout Tutor Profile on eduPulseBd",
    excerpt:
      "Your profile is your first impression. Learn how top-rated tutors on our platform write compelling bios, set competitive rates, and earn trust from parents.",
    category: "Tutors",
    author: "Rakib Hasan",
    authorAvatar: "RH",
    date: "May 14, 2025",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "10 Quick Tips to Improve Your English Speaking Skills at Home",
    excerpt:
      "You don't need an expensive course. With a few daily habits and a good tutor, you can speak confidently in English within months.",
    category: "Tips & Tricks",
    author: "Nadia Islam",
    authorAvatar: "NI",
    date: "May 8, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
    featured: false,
  },
  {
    id: 6,
    title: "Understanding the New Curriculum: A Parent's Complete Guide",
    excerpt:
      "Bangladesh's new national curriculum has changed how children learn from Class 1 to Class 10. Here's what every parent needs to know to support their child.",
    category: "Parenting",
    author: "Fariha Chowdhury",
    authorAvatar: "FC",
    date: "April 30, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
    featured: false,
  },
  {
    id: 7,
    title: "How to Prepare for University Admission Tests in Bangladesh",
    excerpt:
      "Getting into a top public university requires more than good HSC results. Understand the exam patterns, time management tricks, and subject priorities for DU, BUET, and medical admissions.",
    category: "Students",
    author: "Mehedi Hassan",
    authorAvatar: "MH",
    date: "April 22, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80",
    featured: false,
  },
  {
    id: 8,
    title: "The Benefits of Group Tutoring vs One-on-One Sessions",
    excerpt:
      "Both models have distinct advantages depending on the student's learning style, subject difficulty, and budget. Here's how to decide which works best for your child.",
    category: "Education",
    author: "Tania Begum",
    authorAvatar: "TB",
    date: "April 15, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1543269665-7821e27f5d91?w=600&q=80",
    featured: false,
  },
  {
    id: 9,
    title: "Earning as a Part-Time Tutor While Studying at University",
    excerpt:
      "Thousands of university students in Bangladesh supplement their income through tutoring. Learn how to manage your schedule, set the right rates, and build a loyal student base.",
    category: "Career",
    author: "Rakib Hasan",
    authorAvatar: "RH",
    date: "April 8, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    featured: false,
  },
  {
    id: 10,
    title: "How to Motivate a Child Who Hates Studying",
    excerpt:
      "Not every child is naturally motivated. Discover research-backed strategies that parents and tutors use to reignite curiosity and build consistent study habits.",
    category: "Parenting",
    author: "Nadia Islam",
    authorAvatar: "NI",
    date: "March 30, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=600&q=80",
    featured: false,
  },
  {
    id: 11,
    title: "Top 7 Subjects Students Need the Most Help With in Bangladesh",
    excerpt:
      "Math, Physics, and English consistently top the list. We analyzed thousands of tuition requests on eduPulseBd to identify where students struggle most — and why.",
    category: "Education",
    author: "Arif Hossain",
    authorAvatar: "AH",
    date: "March 22, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80",
    featured: false,
  },
  {
    id: 12,
    title: "How to Handle Difficult Students: A Guide for New Tutors",
    excerpt:
      "Every tutor encounters a challenging student sooner or later. From disengagement to disrespect, here are proven ways to turn the relationship around professionally.",
    category: "Tutors",
    author: "Fariha Chowdhury",
    authorAvatar: "FC",
    date: "March 14, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600&q=80",
    featured: false,
  },
  {
    id: 13,
    title: "Night Study vs Morning Study: What Science Says",
    excerpt:
      "Are you a night owl or an early bird? Research suggests the answer matters for how well you retain information. Find out which schedule suits different subjects and personality types.",
    category: "Tips & Tricks",
    author: "Mehedi Hassan",
    authorAvatar: "MH",
    date: "March 5, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80",
    featured: false,
  },
  {
    id: 14,
    title: "Why Girls in Rural Bangladesh Are Missing Out on Quality Tuition",
    excerpt:
      "Despite progress in enrollment, access to quality private tutoring remains unequal. eduPulseBd is working to change that — here's the story and what still needs to be done.",
    category: "Education",
    author: "Tania Begum",
    authorAvatar: "TB",
    date: "February 25, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    featured: false,
  },
  {
    id: 15,
    title: "How eduPulseBd Verifies Tutors: Our Trust & Safety Process",
    excerpt:
      "Parents often ask: how do we know if a tutor is qualified and safe? Here's a transparent look at our verification steps, review system, and ongoing quality monitoring.",
    category: "Tutors",
    author: "Rakib Hasan",
    authorAvatar: "RH",
    date: "February 17, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    featured: false,
  },
  {
    id: 16,
    title: "Building a Career in Education Technology in Bangladesh",
    excerpt:
      "EdTech is one of the fastest-growing sectors in South Asia. Whether you're a developer, educator, or entrepreneur, here's how to carve out your path in Bangladesh's growing EdTech space.",
    category: "Career",
    author: "Arif Hossain",
    authorAvatar: "AH",
    date: "February 8, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    featured: false,
  },
  {
    id: 17,
    title: "How to Set Academic Goals That Your Child Will Actually Achieve",
    excerpt:
      "Vague goals like 'do better in school' rarely work. Learn how to use the SMART goal framework adapted for students to set targets that feel achievable and motivating.",
    category: "Parenting",
    author: "Nadia Islam",
    authorAvatar: "NI",
    date: "January 30, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    featured: false,
  },
  {
    id: 18,
    title: "The Rise of AI Tutoring Tools: Hype or Real Help?",
    excerpt:
      "AI-powered tools like chatbots and adaptive platforms are entering classrooms worldwide. We look at what works, what doesn't, and how human tutors still have the edge.",
    category: "Education",
    author: "Mehedi Hassan",
    authorAvatar: "MH",
    date: "January 20, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    featured: false,
  },
  {
    id: 19,
    title: "How to Ace Your Class Tests Without Last-Minute Cramming",
    excerpt:
      "Last-minute cramming might feel productive but the science says otherwise. Here's a 7-day study plan template that helps students review consistently and retain more before any class test.",
    category: "Tips & Tricks",
    author: "Fariha Chowdhury",
    authorAvatar: "FC",
    date: "January 10, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&q=80",
    featured: false,
  },
];

const POSTS_PER_PAGE = 6;

const CATEGORY_COLORS = {
  "Tips & Tricks": {
    bg: "#EFF6FF",
    text: "#1D4ED8",
    darkBg: "#1e3a5f",
    darkText: "#93c5fd",
  },
  Tutors: {
    bg: "#F0FDF4",
    text: "#15803D",
    darkBg: "#14532d",
    darkText: "#86efac",
  },
  Students: {
    bg: "#FFF7ED",
    text: "#C2410C",
    darkBg: "#431407",
    darkText: "#fdba74",
  },
  Education: {
    bg: "#FAF5FF",
    text: "#7E22CE",
    darkBg: "#3b0764",
    darkText: "#d8b4fe",
  },
  Parenting: {
    bg: "#FFF1F2",
    text: "#BE123C",
    darkBg: "#4c0519",
    darkText: "#fda4af",
  },
  Career: {
    bg: "#FFFBEB",
    text: "#B45309",
    darkBg: "#451a03",
    darkText: "#fcd34d",
  },
};

const AVATAR_COLORS = {
  NI: "#ec4899",
  AH: "#f97316",
  TB: "#a855f7",
  RH: "#16a34a",
  FC: "#f43f5e",
  MH: "#2563eb",
};

// ─── CategoryBadge ─────────────────────────────────────────────────────────────
function CategoryBadge({ category, isDark }) {
  const c = CATEGORY_COLORS[category] || {
    bg: "#F1F5F9",
    text: "#475569",
    darkBg: "#1e293b",
    darkText: "#94a3b8",
  };
  return (
    <span
      style={{
        backgroundColor: isDark ? c.darkBg : c.bg,
        color: isDark ? c.darkText : c.text,
      }}
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
    >
      {category}
    </span>
  );
}

// ─── AvatarInitials ─────────────────────────────────────────────────────────────
function AvatarInitials({ initials }) {
  const bg = AVATAR_COLORS[initials] || "#2563eb";
  return (
    <div
      style={{ backgroundColor: bg }}
      className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
    >
      {initials}
    </div>
  );
}

// ─── FeaturedCard ───────────────────────────────────────────────────────────────
function FeaturedCard({ post, isDark }) {
  return (
    <div
      className={`group rounded-2xl overflow-hidden shadow-sm border transition-shadow duration-300 flex flex-col md:flex-row
      ${isDark ? "bg-gray-800 border-gray-700 hover:shadow-gray-900" : "bg-white border-gray-100 hover:shadow-md"}`}
    >
      <div className="md:w-1/2 h-56 md:h-auto overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
              ${isDark ? "bg-blue-900 text-blue-300" : "bg-blue-50 text-blue-600"}`}
            >
              ✦ Featured
            </span>
            <CategoryBadge category={post.category} isDark={isDark} />
          </div>
          <h2
            className={`text-xl md:text-2xl font-bold leading-snug mb-3 group-hover:text-blue-500 transition-colors
            ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {post.title}
          </h2>
          <p
            className={`text-sm leading-relaxed line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            {post.excerpt}
          </p>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AvatarInitials initials={post.authorAvatar} />
            <div>
              <p
                className={`text-xs font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}
              >
                {post.author}
              </p>
              <p
                className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                {post.date}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            ⏱ {post.readTime}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── BlogCard ───────────────────────────────────────────────────────────────────
function BlogCard({ post, isDark }) {
  return (
    <div
      className={`group rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 flex flex-col
      ${isDark ? "bg-gray-800 border-gray-700 hover:shadow-gray-900 hover:shadow-md" : "bg-white border-gray-100 hover:shadow-md"}`}
    >
      <div className="h-44 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={post.category} isDark={isDark} />
          <span
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            ⏱ {post.readTime}
          </span>
        </div>
        <h3
          className={`text-base font-bold leading-snug mb-2 group-hover:text-blue-500 transition-colors flex-1
          ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {post.title}
        </h3>
        <p
          className={`text-sm leading-relaxed line-clamp-2 mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {post.excerpt}
        </p>
        <div
          className={`flex items-center gap-2 mt-auto pt-3 border-t ${isDark ? "border-gray-700" : "border-gray-50"}`}
        >
          <AvatarInitials initials={post.authorAvatar} />
          <div>
            <p
              className={`text-xs font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}
            >
              {post.author}
            </p>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              {post.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ─────────────────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange, isDark }) {
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase = `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed`;
  const btnIdle = isDark
    ? "border border-lime-700 bg-gray-800 text-lime-400 hover:bg-gray-700"
    : "border border-lime-300 bg-white text-lime-700 hover:bg-lime-50";

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${btnIdle}`}
      >
        ← Prev
      </button>

      {getPages().map((page, idx) =>
        page === "..." ? (
          <span
            key={`dot-${idx}`}
            className={`px-2 py-2 text-sm select-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-xl text-sm font-semibold transition ${
              currentPage === page
                ? "bg-lime-400 text-lime-900 shadow-sm"
                : isDark
                  ? "bg-gray-800 text-lime-400 border border-lime-700 hover:bg-gray-700"
                  : "bg-white text-lime-700 border border-lime-300 hover:bg-lime-50"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${btnIdle}`}
      >
        Next →
      </button>
    </div>
  );
}

// ─── Blog Page ──────────────────────────────────────────────────────────────────
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.getAttribute("data-theme") === "dark" ||
        document.documentElement.classList.contains("dark")
      );
    }
    return false;
  });

  // Sync with existing site theme if it changes externally
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme");
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setIsDark(theme === "dark" || hasDarkClass);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const featured = BLOG_POSTS.find((p) => p.featured);
  const allFiltered = BLOG_POSTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return !p.featured && matchCat && matchSearch;
  });

  const totalPages = Math.ceil(allFiltered.length / POSTS_PER_PAGE);
  const paginated = allFiltered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Theme-aware token shortcuts
  const pageBg = isDark ? "bg-gray-900" : "bg-[#F8FAFC]";
  const heroBg = isDark ? "bg-gray-950" : "bg-[#0F172A]";
  const filterBg = isDark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-100";
  const labelCls = isDark ? "text-gray-500" : "text-gray-400";
  const countCls = isDark ? "text-blue-400" : "text-blue-500";
  const pgCls = isDark ? "text-gray-500" : "text-gray-400";
  const emptyTxt = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${pageBg}`}>
      {/* ── Hero ── */}
      <section
        className={`${heroBg} py-16 px-4 transition-colors duration-300`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            eduPulseBd Blog
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Insights for Learners,{" "}
            <span className="text-blue-400">Tutors & Parents</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-8">
            Tips, guides, and stories to help you get the most out of your
            education journey in Bangladesh.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition"
            />
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section
        className={`sticky top-0 z-10 border-b shadow-sm transition-colors duration-300 ${filterBg}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Featured */}
        {featured &&
          activeCategory === "All" &&
          searchQuery === "" &&
          currentPage === 1 && (
            <div>
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-4 ${labelCls}`}
              >
                Featured Article
              </p>
              <FeaturedCard post={featured} isDark={isDark} />
            </div>
          )}

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p
              className={`text-xs font-bold uppercase tracking-widest ${labelCls}`}
            >
              {activeCategory === "All" ? "Latest Articles" : activeCategory}
              <span className={`ml-2 normal-case font-medium ${countCls}`}>
                ({allFiltered.length} articles)
              </span>
            </p>
            {totalPages > 1 && (
              <p className={`text-xs ${pgCls}`}>
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          {paginated.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className={`font-semibold ${emptyTxt}`}>No articles found</p>
              <p className={`text-sm mt-1 ${labelCls}`}>
                Try a different search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((post) => (
                <BlogCard key={post.id} post={post} isDark={isDark} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isDark={isDark}
            />
          )}
        </div>

        {/* Newsletter CTA */}
        <section
          className={`rounded-2xl p-8 md:p-12 text-center transition-colors duration-300 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-[#0F172A]"}`}
        >
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Stay Updated
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Get the latest articles in your inbox
          </h2>
          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
            Weekly education tips, tutor spotlights, and platform news — no
            spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 transition"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
