import Container from "../Container";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/user-1.jpg";
import logo from "../../../assets/images/bd-tuition.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigate } from "react-router";

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

  // 🌟 Professional Desktop Active Link Class (Pill Style)
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 tracking-wide ${
      isActive
        ? "bg-lime-600 text-white shadow-md shadow-lime-500/20 dark:shadow-lime-600/30 font-semibold"
        : "text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  // 🌟 Professional Mobile Active Link Class
  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center mx-3 my-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive
        ? "text-lime-600 dark:text-blue-400 bg-lime-50 dark:bg-lime-950/40 border-l-4 border-lime-600 font-semibold shadow-sm"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
    }`;

  return (
    <div className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100 dark:border-gray-800/60 transition-colors duration-300">
      <div className="py-2.5">
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

              <Link to="/" className="flex items-center gap-2 shrink-0 group">
                <img
                  src={logo}
                  alt="logo"
                  className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="font-bold text-xl tracking-tight hidden sm:block bg-lime-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  eduPulseBd
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Logged OUT Navbar Items */}
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

              {/* Logged IN Navbar Items */}
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
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className={`relative flex items-center w-[52px] h-[26px] rounded-full p-0.5 transition-all duration-300 focus:outline-none ring-1 ${
                  darkMode
                    ? "bg-gray-800 ring-gray-700"
                    : "bg-gray-100 ring-gray-200"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-[22px] h-[22px] rounded-full shadow-md transition-all duration-300
                   ${
                     darkMode
                       ? "translate-x-[24px] bg-gray-900"
                       : "translate-x-0 bg-white"
                   }`}
                >
                  {darkMode ? (
                    <HiSun size={14} className="text-yellow-400" />
                  ) : (
                    <HiMoon size={14} className="text-blue-600" />
                  )}
                </span>
              </button>

              {/* Avatar / Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 p-1.5 pl-3 rounded-full cursor-pointer hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition select-none bg-white dark:bg-gray-800"
                >
                  <BsThreeDots
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <img
                    loading="lazy"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500"
                    src={user?.photoURL || avatarImg}
                    referrerPolicy="no-referrer"
                    alt="profile"
                  />
                </div>

                {isOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/80 overflow-hidden text-sm z-50 py-1.5">
                    {user && (
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700/80">
                        <p className="font-semibold text-gray-800 dark:text-white truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {user.email}
                        </p>
                        <span className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-lime-600 dark:text-lime-400 font-medium border border-blue-100 dark:border-blue-900/30">
                          {role || "User"}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col pt-1">
                      {!user ? (
                        <>
                          <NavLink
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition"
                          >
                            Login
                          </NavLink>
                          <NavLink
                            to="/signup"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition"
                          >
                            Register
                          </NavLink>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to="/dashboard/profile"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 transition"
                          >
                            Profile
                          </NavLink>
                          <NavLink
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 transition"
                          >
                            Dashboard
                          </NavLink>
                          <NavLink
                            to="/dashboard/profile-setting"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 transition"
                          >
                            Settings
                          </NavLink>
                          <div className="border-t border-gray-100 dark:border-gray-700/80 my-1.5" />
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
                            className="text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 font-medium transition w-full"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
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
          mobileMenuOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"
        } bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl`}
      >
        <nav className="flex flex-col py-2 bg-gray-50/50 dark:bg-gray-900/50">
          {/* Logged OUT mobile */}
          {!user && (
            <>
              <NavLink to="/" className={mobileNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/all-tuitions" className={mobileNavLinkClass}>
                Explore
              </NavLink>
              <NavLink to="/about" className={mobileNavLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={mobileNavLinkClass}>
                Contact
              </NavLink>
              <NavLink to="/login" className={mobileNavLinkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={mobileNavLinkClass}>
                Sign Up
              </NavLink>
            </>
          )}

          {/* Logged IN mobile */}
          {user && (
            <>
              <NavLink to="/" className={mobileNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/all-tuitions" className={mobileNavLinkClass}>
                Explore
              </NavLink>
              <NavLink to="/dashboard" className={mobileNavLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/blogs" className={mobileNavLinkClass}>
                Blog
              </NavLink>
              <NavLink to="/contact" className={mobileNavLinkClass}>
                Contact
              </NavLink>
              <NavLink to="/about" className={mobileNavLinkClass}>
                About
              </NavLink>
              <NavLink to="/dashboard/profile" className={mobileNavLinkClass}>
                Profile
              </NavLink>
              <button
                onClick={() => {
                  logOut();
                  setMobileMenuOpen(false);
                }}
                className="text-left mx-3 my-1 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition"
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
