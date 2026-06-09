import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";

const ProfileSetting = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.photo,
      });
      setUser({ ...user, displayName: data.name, photoURL: data.photo });
      toast.success("Profile updated successfully ✅");
    } catch (error) {
      toast.error("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center
      bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100
      dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6"
    >
      <div
        className="w-full max-w-5xl
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-2xl rounded-3xl p-6 md:p-10"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Profile Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT — Profile Info */}
          <div
            className="flex flex-col items-center text-center space-y-4
            border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700
            pb-6 md:pb-0 md:pr-6"
          >
            <div className="relative group">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover
                  border-4 border-white dark:border-gray-600
                  shadow-lg transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            </div>

            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {user?.displayName}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {user?.email}
            </p>
          </div>

          {/* RIGHT — Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl
                  border border-gray-200 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Profile Image URL
              </label>
              <input
                type="text"
                {...register("photo", { required: "Photo URL is required" })}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 rounded-xl
                  border border-gray-200 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
                loading
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
