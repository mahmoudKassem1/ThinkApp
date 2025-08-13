import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-3 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        {/* Social Links */}
        <div className="flex space-x-4 mb-2 sm:mb-0">
          <a
            href="https://github.com/mahmoudKassem1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/mahmoud-kassem-91aa22305/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors duration-300"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} MahmoudKassem - ThinkApp . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
