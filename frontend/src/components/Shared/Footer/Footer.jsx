import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        {/* About Platform */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            About eTuitionBD
          </h2>
          <p className="text-sm leading-6">
            eTuitionBD connects students with trusted tutors across Bangladesh.
            Our goal is to make learning easier, smarter, and accessible for
            everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tutors" className="hover:text-white transition">
                Tutors
              </Link>
            </li>
            <li>
              <Link to="/add-tuition" className="hover:text-white transition">
                Add Tuition
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
          <p className="text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-sm">📧 faysalhasanmd393@gmail.com</p>
          <p className="text-sm">📞 +880 1798484639</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>

          <div className="flex gap-4 text-lg">
            <a
              href="https://www.facebook.com/md.faysal.751946"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://en.wikipedia.org/wiki/Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/md-faysal-hasan-0a2703365/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>

            <a
              href="https://en.wikipedia.org/wiki/Twitter,_Inc."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} eTuitionBD Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
