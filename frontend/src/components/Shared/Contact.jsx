import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Message Sent Successfully",
      text: "We will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#6366f1",
    });
    e.target.reset();
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gray-100 dark:bg-gray-800 text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-indigo-500 dark:text-indigo-400"
        >
          Get in Touch with Us
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
          Have questions, feedback, or need support? Our team is always ready to
          help you and respond within a short time.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-20 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Contact Information
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Feel free to contact us for any support, feedback, or business
            inquiries.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">
                support@etuitionbd.com
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <FaPhoneAlt className="text-green-600 dark:text-green-400 text-xl shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">
                +880 1234 567890
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-xl shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl p-10"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl
                border border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-xl
                border border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <textarea
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 rounded-xl h-32
                border border-gray-200 dark:border-gray-600
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                text-white py-3 rounded-xl font-semibold shadow-md
                hover:scale-105 active:scale-95 transition"
            >
              Send Message <FiSend />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        Built with care by Md Faysal Hasan
      </div>
    </div>
  );
};

export default Contact;
