import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type AuthMode = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setMode(initialMode);
    // reset fields when opened
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      // Basic client-side validation example
      if (!name.trim()) return alert("Please enter your name.");
      if (password !== confirmPassword) return alert("Passwords do not match.");
      // Replace with real register API call
      console.log("Registering:", { name, email, password });
      alert("Registered (demo). Check console for data.");
    } else {
      // Replace with real login API call
      console.log("Logging in:", { email, password });
      alert("Logged in (demo). Check console for data.");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-md mx-4 bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{mode === "login" ? "Login" : "Create account"}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {mode === "login" ? "Need an account?" : "Already have an account?"}
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-400 hover:text-white p-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 outline-none text-white placeholder-gray-400"
                placeholder="Your name"
                required={mode === "register"}
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 outline-none text-white placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 outline-none text-white placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm text-gray-300 mb-1">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 outline-none text-white placeholder-gray-400"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#00B4D8] text-black px-5 py-2 rounded-md font-medium hover:bg-[#0096b4] transition-all"
            >
              {mode === "login" ? "Login" : "Create account"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-300 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  return (
    <>
      <nav className="fixed w-full z-50 top-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo + Left links */}
            <div className="flex items-center space-x-12">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-[#00B4D8] text-2xl">▲</span>
                <span className="text-white font-medium">Decode</span>
              </Link>

              {/* Navigation Links */}
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

            {/* Right actions */}
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

      {/* Auth Modal (using working logic from Code-2) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      {/* Spacer so page content isn't hidden behind fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
