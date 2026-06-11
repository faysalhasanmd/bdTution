import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveAndUpdateUser } from "../../Utility";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { signIn, signInWithGoogle, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to={from} replace={true} />;

  // ── Client-side validation ────────────────────────────────────────────────
  const validate = (emailVal, passwordVal) => {
    const errs = {};
    if (!emailVal.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!passwordVal) {
      errs.password = "Password is required.";
    } else if (passwordVal.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  };

  // ── Demo auto-fill ────────────────────────────────────────────────────────
  const handleDemoFill = (type) => {
    setEmail(DEMO[type].email);
    setPassword(DEMO[type].password);
    setErrors({});
    toast(`${DEMO[type].label} credentials filled! Click Continue to log in.`, {
      icon: DEMO[type].icon,
      duration: 3000,
    });
  };

  const DEMO = {
    student: {
      email: "demostudent@bdtuitions.com",
      password: "Student@1234",
      label: "Demo Student",
    },
    tutor: {
      email: "demotutor@bdtuitions.com",
      password: "Tutor@1234",
      label: "Demo Tutor",
    },
    admin: {
      email: "demoadmin@bdtuitions.com",
      password: "Admin@1234",
      label: "Demo Admin",
    },
  };

  // ── Token expiration scheduler ───────────────────
  const scheduleTokenExpiry = async (firebaseUser) => {
    try {
      const tokenResult = await firebaseUser.getIdTokenResult();
      const msUntilExpiry =
        new Date(tokenResult.expirationTime).getTime() - Date.now();
      if (msUntilExpiry > 0) {
        if (msUntilExpiry > 2 * 60 * 1000) {
          setTimeout(
            () => {
              toast("Your session will expire in 2 minutes.", {
                icon: "⏳",
                duration: 8000,
              });
            },
            msUntilExpiry - 2 * 60 * 1000,
          );
        }
        // Token expire logout
        setTimeout(async () => {
          await signOut(useAuth);
          toast.error("Session expired. Please log in again.");
          navigate("/login", { replace: true });
        }, msUntilExpiry);
      }
    } catch {
      // token check fail
    }
  };

  // ── Form submit ───────────────────────────────────────────────────────────
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const { user: firebaseUser } = await signIn(email, password);

      // Token expiration handle
      await scheduleTokenExpiry(firebaseUser);

      await saveAndUpdateUser({
        name: firebaseUser?.displayName,
        email: firebaseUser?.email,
        image: firebaseUser?.photoURL,
        uid: firebaseUser.uid,
        phone: "",
        role: "Student",
      });

      toast.success("Login successful! Welcome back.");
      navigate(from, { replace: true });
    } catch (err) {
      const code = err?.code;
      if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        setErrors({ server: "Invalid email or password. Please try again." });
      } else if (code === "auth/too-many-requests") {
        setErrors({
          server: "Too many failed attempts. Please try again later.",
        });
      } else if (code === "auth/user-disabled") {
        setErrors({
          server: "This account has been disabled. Contact support.",
        });
      } else if (code === "auth/id-token-expired") {
        setErrors({ server: "Session expired. Please log in again." });
      } else {
        setErrors({ server: "Login failed. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ── Google Sign-in ────────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setErrors({});
    setGoogleLoading(true);
    try {
      const { user: firebaseUser } = await signInWithGoogle();

      // Google login token expiry handle
      await scheduleTokenExpiry(firebaseUser);

      await saveAndUpdateUser({
        name: firebaseUser?.displayName,
        email: firebaseUser?.email,
        image: firebaseUser?.photoURL,
        uid: firebaseUser.uid,
        phone: "",
        role: "Student",
      });
      toast.success("Login successful! Welcome back.");
      navigate(from, { replace: true });
    } catch (err) {
      setLoading(false);
      setErrors({ server: "Google sign-in failed. Please try again." });
    } finally {
      setGoogleLoading(false);
    }
  };

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col w-full max-w-md p-6 sm:p-10 bg-gray-100 text-gray-900 border border-gray-600 mx-4 shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>

        {/* ── Demo Login Buttons ── */}
        <div className="mb-6">
          <p className="text-xs text-center text-slate-500 mb-3 font-semibold uppercase tracking-[0.2em]">
            Quick Demo Access
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleDemoFill("student")}
              disabled={submitting || googleLoading}
              className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill("tutor")}
              disabled={submitting || googleLoading}
              className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Tutor</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              disabled={submitting || googleLoading}
              className="group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-violet-100 text-violet-700 font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:from-violet-100 hover:to-violet-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Admin</span>
            </button>
          </div>
        </div>
        {/* ───────────────────────── */}

        {/* Server error banner */}
        {errors.server && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md"
          >
            <span className="mt-0.5">⚠️</span>
            <span>{errors.server}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1.5 text-sm font-medium text-gray-700"
              >
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-200 text-gray-900 transition
                  ${errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-lime-400"}`}
              />
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1.5 text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  aria-invalid={!!errors.password}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-200 text-gray-900 transition
                    ${errors.password ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-lime-400"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.password}
                </p>
              )}

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between mt-2.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-lime-500 cursor-pointer"
                  />
                  <span className="text-xs text-gray-500">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-xs text-gray-400 hover:text-lime-500 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting || googleLoading}
            className="w-full py-3 rounded-md text-white font-semibold bg-lime-500 hover:bg-lime-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <TbFidgetSpinner className="animate-spin text-lg" />
                Signing in...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="text-sm text-gray-400 whitespace-nowrap">
            or continue with
          </p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={submitting || googleLoading}
          aria-label="Sign in with Google"
          className="flex justify-center items-center gap-3 w-full border border-gray-300 rounded-md px-4 py-2.5 hover:bg-gray-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {googleLoading ? (
            <TbFidgetSpinner className="animate-spin text-lg text-gray-500" />
          ) : (
            <FcGoogle size={22} />
          )}
          <span className="text-sm font-medium text-gray-700">
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </span>
        </button>

        {/* Sign up link */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            state={from}
            to="/signup"
            className="text-gray-600 hover:text-lime-500 hover:underline font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
