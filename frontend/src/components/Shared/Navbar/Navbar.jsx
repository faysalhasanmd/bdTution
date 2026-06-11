import Container from "../Container";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/bd-tuition.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router"; // অথবা "react-router-dom"

const Navbar = ({ sidebarOpen, onSidebarToggle }) => {
  const { user, logOut, role } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition duration-300 ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700 transition duration-200 ${
      isActive
        ? "text-blue-600 font-semibold bg-blue-50 dark:bg-blue-900/30"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="fixed w-full bg-white dark:bg-gray-900 z-50 shadow-sm dark:shadow-gray-800/50 transition-colors duration-300">
      <div className="py-3">
        <Container>
          <div className="flex items-center justify-between">
            {/* Left — sidebar toggle (logged in only) + logo */}
            <div className="flex items-center gap-2">
              {user && (
                <button
                  onClick={onSidebarToggle}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-800 dark:text-gray-200"
                  aria-label="Toggle sidebar"
                >
                  <div
                    className={`transition-transform duration-300 ease-in-out ${
                      sidebarOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    {sidebarOpen ? (
                      <AiOutlineClose size={22} />
                    ) : (
                      <GiHamburgerMenu size={22} />
                    )}
                  </div>
                </button>
              )}

              <Link to="/" className="flex items-center gap-2 shrink-0">
                <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
                <span className="font-bold text-lg hidden sm:block text-gray-900 dark:text-white">
                  eTuitionBd
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
              {/* Logged OUT: Home, Explore, About, Contact, Login */}
              {!user && (
                <>
                  <NavLink to="/" className={navLinkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/all-tuitions" className={navLinkClass}>
                    Explore
                  </NavLink>
                  <NavLink to="/about" className={navLinkClass}>
                    About
                  </NavLink>
                  <NavLink to="/contact" className={navLinkClass}>
                    Contact
                  </NavLink>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                </>
              )}

              {/* Logged IN: Home, Explore, Dashboard, Blog, Contact, About */}
              {user && (
                <>
                  <NavLink to="/" className={navLinkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/all-tuitions" className={navLinkClass}>
                    Explore
                  </NavLink>
                  <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/blogs" className={navLinkClass}>
                    Blog
                  </NavLink>
                  <NavLink to="/contact" className={navLinkClass}>
                    Contact
                  </NavLink>
                  <NavLink to="/about" className={navLinkClass}>
                    About
                  </NavLink>
                </>
              )}
            </div>

            {/* Right — dark mode + avatar dropdown + mobile menu btn */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className={`relative flex items-center w-[52px] h-[22px] rounded-full p-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  darkMode
                    ? "bg-gray-700 focus:ring-blue-500 focus:ring-offset-gray-900"
                    : "bg-gray-200 focus:ring-blue-400 focus:ring-offset-white"
                }`}
              >
                {/* sliding circle */}
                <span
                  className={`flex items-center justify-center w-[22px] h-[22px] rounded-full shadow-md transition-all duration-300
                   ${
                     darkMode
                       ? "translate-x-[26px] bg-gray-900"
                       : "translate-x-0 bg-white"
                   }`}
                >
                  {darkMode ? (
                    <HiSun size={13} className="text-yellow-400" />
                  ) : (
                    <HiMoon size={13} className="text-gray-500" />
                  )}
                </span>
              </button>

              {/* Avatar / Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-full cursor-pointer hover:shadow-md transition select-none bg-white dark:bg-gray-800"
                >
                  <BsThreeDots
                    size={18}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <img
                    loading="lazy"
                    className="w-8 h-8 rounded-full object-cover"
                    src={user?.photoURL || avatarImg}
                    referrerPolicy="no-referrer"
                    alt="profile"
                  />
                </div>

                {isOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden text-sm z-50">
                    {/* Logged IN — user info header */}
                    {user && (
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-800 dark:text-white truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                        <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium">
                          {role || "User"}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col py-1">
                      {!user ? (
                        <>
                          <NavLink
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                          >
                            Login
                          </NavLink>
                          <NavLink
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                          >
                            Register
                          </NavLink>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to="/dashboard/profile"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white transition"
                          >
                            Profile
                          </NavLink>
                          <NavLink
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white transition"
                          >
                            Dashboard
                          </NavLink>
                          <NavLink
                            to="/dashboard/profile-setting"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white transition"
                          >
                            Settings
                          </NavLink>
                          <div className="border-t border-gray-100 dark:border-gray-700 mt-1" />
                          <button
                            onClick={async () => {
                              try {
                                await logOut();
                                setIsOpen(false);
                                navigate("/login");
                              } catch (error) {
                                console.error("Logout failed:", error);
                              }
                            }}
                            className="text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition w-full"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button — only show when logged out, or logged in without sidebar */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-800 dark:text-gray-200"
                aria-label="Toggle menu"
              >
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  {mobileMenuOpen ? (
                    <AiOutlineClose size={22} />
                  ) : (
                    <AiOutlineMenu size={22} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 shadow-md`}
      >
        <nav className="flex flex-col text-sm font-medium">
          {/* Logged OUT mobile */}
          {!user && (
            <>
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/all-tuitions"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </NavLink>
              <NavLink
                to="/about"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                to="/login"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}

          {/* Logged IN mobile */}
          {user && (
            <>
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/all-tuitions"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </NavLink>
              <NavLink
                to="/dashboard"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/blogs"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              <NavLink
                to="/about"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  logOut();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-b border-gray-100 dark:border-gray-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
