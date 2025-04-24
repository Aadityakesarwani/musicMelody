import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
      <p className="text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Music Melody. All rights reserved. 
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {/* Link to the Terms of Service page */}
        <Link
          className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
          to="/TermsOfService" // Use the path you defined for Terms of Service in your router
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
          to="/Privacy" // Use the path you defined for Privacy Policy in your router
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}