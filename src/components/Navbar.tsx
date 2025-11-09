import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

const Navbar: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

  return (
    <>
      <nav className="fixed w-full z-50 top-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-[#00B4D8] text-2xl">▲</span>
                <span className="text-white font-medium">Decode</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
                <Link to="/speakers" className="text-gray-300 hover:text-white transition-colors">
                  Speakers
                </Link>
                <Link to="/agenda" className="text-gray-300 hover:text-white transition-colors">
                  Agenda
                </Link>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-full transition-colors duration-200"
              >
                Login
              </button>

              <button
                onClick={() => {
                  setAuthMode("register");
                  setShowAuthModal(true);
                }}
                className="bg-[#00B4D8] text-white px-6 py-2 rounded-md hover:bg-[#0096b4] transition-all"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      <div className="h-20" />
    </>
  );
};

export default Navbar;
