import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { saveAndUpdateUser } from "../../Utility";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [role, setRole] = useState("Student");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const {
      name,
      email,
      password,
      phone,
      education,
      experience,
      subjects,
      location: loc,
      about,
    } = data;

    setSubmitting(true);
    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, "");
      await saveAndUpdateUser({
        name,
        email,
        phone,
        uid: result.user.uid,
        role,
        image: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
        education: role === "Tutor" ? education : "",
        experience: role === "Tutor" ? experience : "",
        subjects: role === "Tutor" ? subjects : "",
        location: role === "Tutor" ? loc : "",
        about: role === "Tutor" ? about : "",
      });

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err?.message || "Signup Failed",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { user } = await signInWithGoogle();
      await saveAndUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        uid: user.uid,
        phone: "",
        role: "Student",
      });
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google SignIn Failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-100 transition
    ${hasError ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-lime-500"}`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col max-w-md w-full p-6 sm:p-10 bg-white text-gray-900 border border-gray-600 mx-4 shadow-2xl rounded-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 mt-1">Create your account to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              placeholder="Enter Your Name"
              className={inputClass(errors.name)}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className={inputClass(errors.email)}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-1 font-medium"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className={inputClass(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
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
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm mb-1 font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-lime-500 bg-gray-100"
            >
              <option value="Student">Student</option>
              <option value="Tutor">Tutor</option>
            </select>
          </div>

          {/* Additional Tutor Fields */}
          {role === "Tutor" && (
            <>
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm mb-1 font-medium"
                >
                  Education
                </label>
                <input
                  id="education"
                  placeholder="Enter your education"
                  className={inputClass(false)}
                  {...register("education")}
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm mb-1 font-medium"
                >
                  Experience
                </label>
                <input
                  id="experience"
                  placeholder="Enter your experience"
                  className={inputClass(false)}
                  {...register("experience")}
                />
              </div>
              <div>
                <label
                  htmlFor="subjects"
                  className="block text-sm mb-1 font-medium"
                >
                  Subjects
                </label>
                <input
                  id="subjects"
                  placeholder="Enter subjects you teach"
                  className={inputClass(false)}
                  {...register("subjects")}
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm mb-1 font-medium"
                >
                  Location
                </label>
                <input
                  id="location"
                  placeholder="Enter your location"
                  className={inputClass(false)}
                  {...register("location")}
                />
              </div>
              <div>
                <label
                  htmlFor="about"
                  className="block text-sm mb-1 font-medium"
                >
                  About Tutor
                </label>
                <textarea
                  id="about"
                  placeholder="Write something about yourself"
                  className={inputClass(false)}
                  {...register("about")}
                />
              </div>
            </>
          )}

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm mb-1 font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone Number"
              className={inputClass(errors.phone)}
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Invalid phone number (10-15 digits)",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span> {errors.phone.message}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 cursor-pointer accent-lime-500 shrink-0"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 cursor-pointer leading-snug"
            >
              I agree to the{" "}
              <Link
                to="/privacy-policy"
                className="text-lime-500 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-lime-500 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || googleLoading || !acceptedTerms}
            className="w-full py-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex justify-center items-center"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <TbFidgetSpinner className="animate-spin text-lg" />
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="px-3 text-gray-500 text-sm">Or continue with</p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={submitting || googleLoading}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md hover:bg-gray-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {googleLoading ? (
            <TbFidgetSpinner className="animate-spin text-lg text-gray-500" />
          ) : (
            <FcGoogle size={24} />
          )}
          <span className="text-sm font-medium text-gray-700">
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </span>
        </button>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-lime-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
