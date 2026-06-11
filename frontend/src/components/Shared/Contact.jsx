import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { TbFidgetSpinner } from "react-icons/tb";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed");

      toast.success("Message sent successfully! We'll get back to you soon ✅");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-800 p-5 dark:text-white">
            Contact <span className="text-lime-500">Us</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
            Have a question or need help? Fill out the form and our team will
            respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info Cards */}
          <div className="space-y-4">
            {[
              {
                icon: <FiMail className="text-lime-500" size={20} />,
                label: "Email",
                value: "faysalhasanmd393@gmail.com",
              },
              {
                icon: <FiPhone className="text-lime-500" size={20} />,
                label: "Phone",
                value: "+880 1798484639",
              },
              {
                icon: <FiMapPin className="text-lime-500" size={20} />,
                label: "Address",
                value: "Dhaka, Bangladesh",
              },
            ].map((info) => (
              <div
                key={info.label}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-lime-50 dark:bg-lime-900/20 rounded-xl flex items-center justify-center shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                    {info.label}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 mt-0.5">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 20, message: "Minimum 20 characters" },
                  })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-lime-500 text-white font-semibold rounded-xl hover:bg-lime-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
              >
                {submitting ? (
                  <>
                    <TbFidgetSpinner className="animate-spin text-lg" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
