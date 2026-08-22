import React, { useState, useEffect } from "react";

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState("1. Information We Collect");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      title: "1. Information We Collect",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      content:
        "We collect information you provide when registering — such as your name, email address, phone number, and location. Tutors may also provide additional details like qualifications and teaching experience.",
    },
    {
      title: "2. How We Use Your Information",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      content:
        "Your information is used to match students with suitable tutors, improve our platform experience, send important notifications, and provide customer support. We do not sell your data to third parties.",
    },
    {
      title: "3. Data Storage & Security",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      content:
        "All data is securely stored using industry-standard encryption. We use MongoDB for database storage and Firebase for authentication. Access to personal data is strictly limited to authorized personnel.",
    },
    {
      title: "4. Cookies",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      content:
        "We use cookies to keep you logged in and to understand how users interact with our platform. You can disable cookies in your browser settings, but some features may not work correctly.",
    },
    {
      title: "5. Third-Party Services",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      content:
        "eduPulseBD uses third-party services including Firebase (authentication), MongoDB Atlas (database), and Stripe (payments). These services have their own privacy policies which we encourage you to review.",
    },
    {
      title: "6. Your Rights",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      content:
        "You have the right to access, update, or delete your personal data at any time from your profile settings. For account deletion requests, please contact our support team.",
    },
    {
      title: "7. Children's Privacy",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      content:
        "Our platform is designed to help students of all ages. For users under 13, parental consent is required during registration. We take extra care to protect the privacy of younger users.",
    },
    {
      title: "8. Changes to This Policy",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17"
          />
        </svg>
      ),
      content:
        "We may update this Privacy Policy from time to time. Any significant changes will be communicated via email or a notice on our platform. Continued use of the platform constitutes acceptance of the updated policy.",
    },
    {
      title: "9. Contact Us",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9 11h3a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      content: (
        <span>
          If you have any questions about this Privacy Policy, please reach out
          to us at{" "}
          <a
            href="mailto:faysalhasanmd393@gmail.com"
            className="text-lime-600 dark:text-lime-400 font-bold underline decoration-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
          >
            faysalhasanmd393@gmail.com
          </a>{" "}
          or visit our Contact page.
        </span>
      ),
    },
  ];

  const toggleSection = (title) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <div className="bg-gray-50/60 dark:bg-gray-950 min-h-screen py-16 px-4 relative transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-lime-50 dark:bg-lime-500/10 text-lime-600 dark:text-lime-400 uppercase tracking-wider">
            Legal Document
          </span>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-500">
              Policy
            </span>
          </h1>
          <p className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-full inline-block border border-gray-100 dark:border-gray-800">
            Last updated: June {new Date().getFullYear()}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
            At eduPulseBD, your privacy is important to us. This policy explains
            how we collect, use, and protect your personal information safely.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-3.5">
          {sections.map((section) => {
            const isOpen = openSection === section.title;
            return (
              <div
                key={section.title}
                className={`bg-white dark:bg-gray-900/50 dark:backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-lime-500/40 shadow-[0_10px_25px_-5px_rgba(132,204,22,0.05)] dark:shadow-[0_10px_25px_-5px_rgba(132,204,22,0.1)]"
                    : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-800 dark:text-gray-200 transition-colors duration-200 focus:outline-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`p-2 rounded-xl border shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-gradient-to-br from-lime-500 to-emerald-500 text-white border-transparent"
                          : "bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      {section.icon}
                    </div>
                    <span className="text-sm sm:text-base truncate">
                      {section.title}
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <svg
                    className={`w-5 h-5 text-gray-400 dark:text-gray-500 transform transition-transform duration-300 shrink-0 ml-2 ${
                      isOpen
                        ? "rotate-180 text-lime-500 dark:text-lime-400"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Accordion Body Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-48 border-t border-gray-50 dark:border-gray-800/60"
                      : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {section.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none z-50"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicy;
