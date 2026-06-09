import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { FiUser, FiLink, FiMail, FiShield, FiKey } from "react-icons/fi";
import { auth } from "../../../firebase/firebase.config"; // আপনার ফায়ারবেস কনফিগ পাথ অনুযায়ী চেঞ্জ করবেন
import useAuth from "../../../hooks/useAuth";

const ProfileSetting = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photo: user?.photoURL || "",
    },
  });

  // ১. প্রোফাইল আপডেট (নাম ও ছবি)
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photo,
      });
      setUser({ ...user, displayName: data.name, photoURL: data.photo });
      toast.success("Profile info updated successfully ✅");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile info ❌");
    } finally {
      setLoading(false);
    }
  };

  // ২. ইমেইলে পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো (কোনো রিসেন্ট লগইন এরর আসবে না)
  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success("Password reset email sent! Check your inbox 📧");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email ❌");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white mt-3 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/60 overflow-hidden">
        <div className="grid grid-cols-1 rounded-2xl  lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-700/60">
          {/* LEFT — Profile Card Preview */}
          <div className="p-6 md:p-8 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-800/40">
            <div className="bg-white dark:bg-gray-700/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm w-full max-w-sm text-center flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-indigo-50 dark:border-gray-600 shadow-md transition duration-300 transform hover:scale-105"
                />
                <span className="absolute bottom-1 right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800" />
              </div>

              <div className="space-y-1 w-full">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate px-2">
                  {user?.displayName || "User Name"}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
                  <FiMail className="shrink-0" />
                  <span className="truncate max-w-[200px]">{user?.email}</span>
                </div>
              </div>

              <div className="pt-2 w-full border-t border-gray-100 dark:border-gray-700">
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full">
                  <FiShield size={12} /> Verified Account
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Settings Form Fields */}
          <div className="lg:col-span-2 p-6 md:p-10 space-y-8">
            {/* Form 1: Profile Info */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FiUser className="text-indigo-500" size={18} />
                <h4 className="text-md font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide text-xs">
                  Profile Information
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                    Profile Image URL
                  </label>
                  <div className="relative">
                    <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      {...register("photo", {
                        required: "Photo URL is required",
                      })}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                  </div>
                  {errors.photo && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.photo.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-3 bg-lime-500 text-white font-semibold rounded-md hover:bg-lime-600 transition-colors flex justify-center items-center"
                >
                  {loading ? "Saving..." : "Save Profile Info"}
                </button>
              </div>
            </form>

            {/* Section 2: Security / Password Reset */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FiKey className="text-indigo-500" size={18} />
                <h4 className="text-md font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wide text-xs">
                  Account Security
                </h4>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-amber-800 dark:text-amber-400">
                    Want to change your password?
                  </h5>
                  <p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">
                    For security reasons, we will send a secure link to your
                    email to reset your password safely.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={resetLoading}
                  className="shrink-0 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow transition disabled:bg-gray-400"
                >
                  {resetLoading ? "Sending Link..." : "Send Reset Email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
