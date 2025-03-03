import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo & Description */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">HireMitra </h2>
            <p className="text-gray-400 mt-2">
              Empowering your career journey with opportunities that matter.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <a
              href="/about"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              About Us
            </a>
            <a
              href="/jobs"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Jobs
            </a>
            <a
              href="/contact"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Contact
            </a>
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22 12a10 10 0 1 0-11 9.95v-7h-2v-3h2v-2.3c0-2.1 1.2-3.3 3-3.3.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M8.29 20c7.55 0 11.67-6.26 11.67-11.67v-.53A8.35 8.35 0 0 0 22 5.92a8.2 8.2 0 0 1-2.36.65A4.1 4.1 0 0 0 21.43 4a8.22 8.22 0 0 1-2.6 1A4.1 4.1 0 0 0 16.42 4a4.1 4.1 0 0 0-4.1 4.1c0 .32.03.64.1.95A11.64 11.64 0 0 1 3.18 4.5a4.1 4.1 0 0 0 1.27 5.46A4.07 4.07 0 0 1 3 9.19v.05A4.1 4.1 0 0 0 6.1 13a4.11 4.11 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.14a11.62 11.62 0 0 0 6.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2 21h6v-9H2v9ZM9 12h4v1.2a4.4 4.4 0 0 1 3.68-1.8c3.4 0 4.32 2.23 4.32 5.14V21h-6v-3.6c0-.86-.02-1.97-1.2-1.97s-1.38.93-1.38 1.9V21H9v-9Z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center lg:text-right">
            © {new Date().getFullYear()} HireMitra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
