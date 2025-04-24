import { AudioWaveform, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); 
  };

  return (
    <header className="sticky top-0 z-50 px-4 lg:px-6 h-14 flex items-center border-b border-purple-200 dark:border-purple-800 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
      <Link 
        to="/" 
        onClick={() => scrollToSection('hero')} 
        className="flex items-center justify-center"
      >
        <AudioWaveform className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
          Music Melody
        </span>
      </Link>

      {/* Hamburger Menu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="ml-auto md:hidden"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        ) : (
          <Menu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        )}
      </button>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link
          to="/MusicLandingPag"
          
          className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/MusicLandingPage"
          className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          Generate
        </Link>
        <Link
          to="/"
          onClick={() => scrollToSection('faqs')}
          className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          FAQs
        </Link>
        <Link
          to="/LoginSignUpPage"
          className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          Sign In
        </Link>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-800 border-b border-purple-200 dark:border-purple-800 md:hidden">
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              onClick={() => scrollToSection('hero')}
              className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              onClick={() => scrollToSection('generator')}
              className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Generate
            </Link>
            <Link
              to="/"
              onClick={() => scrollToSection('faqs')}
              className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              FAQs
            </Link>
            <Link
              to="/LoginSignUpPage"
              className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}