import React, { useState } from 'react';
import { X } from 'lucide-react';
import { authService } from '../services/auth.service';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  organization: string;
  role: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'register' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    organization: '',
    role: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'register') {
        await authService.signup(formData);
      } else {
        await authService.signup({ ...formData, firstname: '', lastname: '', organization: '', role: '' });
      }
      setOtpSent(true);
      setMessage('OTP sent to your email!');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await authService.verifyOtp({ email: formData.email, otp });
      setMessage(`${mode === 'register' ? 'Registration' : 'Login'} successful! Welcome to DECODE.`);
      setTimeout(() => {
        onClose();
        setOtpSent(false);
        setFormData({ firstname: '', lastname: '', email: '', organization: '', role: '' });
        setOtp('');
      }, 2000);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setOtpSent(false);
    setMessage('');
    setMode(initialMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#001525] border border-[#00B4D8]/30 rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#00B4D8]/20 rounded-full transition-all text-[#00B4D8]"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-white">{mode === 'register' ? 'Secure Your Spot' : 'Welcome Back'}</h2>
        <p className="text-gray-400 text-sm mb-6">{mode === 'register' ? 'Join the DECODE revolution' : 'Sign in to your account'}</p>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('successful') || message.includes('sent') ? 'bg-green-900/30 text-green-300 border border-green-500/30' : 'bg-red-900/30 text-red-300 border border-red-500/30'}`}>
            {message}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.firstname}
                    onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                    className="w-full mt-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Last Name</label>
                  <input
                    type="text"
                    placeholder="Smith"
                    value={formData.lastname}
                    onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                    className="w-full mt-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">University / Company</label>
                  <input
                    type="text"
                    placeholder="Your affiliation"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="w-full mt-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Role</label>
                  <input
                    type="text"
                    placeholder="Your role or title"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full mt-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white/10 transition-all text-white placeholder-gray-500"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full mt-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white/10 transition-all text-white placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#00B4D8] text-black font-semibold rounded-lg hover:bg-[#0096b4] transition-all disabled:opacity-50 mt-6"
            >
              {loading ? 'Sending...' : (mode === 'register' ? 'Register Now' : 'Login')}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
                className="text-[#00B4D8] text-sm hover:text-white transition-all"
              >
                {mode === 'register' ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
              </button>
            </div>
            {mode === 'register' && (
              <p className="text-xs text-gray-500 text-center mt-4">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-[#00B4D8] text-xs font-semibold uppercase tracking-wide mb-2">Verification Required</div>
              <p className="text-gray-400 text-sm">Enter the OTP sent to <span className="text-[#00B4D8]">{formData.email}</span></p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide">One-Time Password</label>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#00B4D8] focus:bg-white/10 transition-all text-white placeholder-gray-500 text-center tracking-widest"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#00B4D8] text-black font-semibold rounded-lg hover:bg-[#0096b4] transition-all disabled:opacity-50 mt-6"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full py-2 text-[#00B4D8] hover:text-white transition-all text-sm"
            >
              Back to {mode === 'register' ? 'Registration' : 'Login'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;