import { AudioWaveform, Menu, X, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user,logout } = useAuth();

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); 
  };

  const handleSignIn = () => {
    navigate('/LoginSignUpPage');
  };

  const handleSettings = () => {
    navigate('/Pricing');
    setShowUserMenu(false);
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
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
        <Link
          to="/"
          onClick={() => scrollToSection('hero')}
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
        {user ? (
          <div className="relative">
            <div 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              className="flex items-center gap-2 cursor-pointer"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
              </Avatar>
            </div>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user?.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleSettings}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button 
                  onClick={logout}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors mt-3"
                  >
                  Logout
                </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="text-purple-600 hover:text-purple-700"
          >
            Sign In
          </button>
        )}
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
            {user ? (
              <div className="py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                  </Avatar>
                </div>
                <button
                  onClick={handleSettings}
                  className="flex items-center gap-2 w-full mt-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button 
                  onClick={logout}
                  className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="py-2 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}