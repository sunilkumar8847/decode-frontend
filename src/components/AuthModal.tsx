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
    <div className="fixed inset-0 bg-[rgba(0,21,37,0.95)] z-50 flex items-center justify-center p-4">
      <div className="bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] rounded-lg p-8 max-w-md w-full relative backdrop-blur-sm">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-[rgba(0,180,216,0.2)] rounded-full transition-all text-[#00B4D8]"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6">{mode === 'register' ? 'Secure Your Spot' : 'Welcome Back'}</h2>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${message.includes('successful') || message.includes('sent') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
            {message}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="space-y-1 mb-4">
                  <label className="text-sm text-[#00B4D8]">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.firstname}
                    onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                    className="w-full px-4 py-3 bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] rounded-md focus:outline-none focus:bg-[rgba(0,180,216,0.2)] transition-all text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1 mb-4">
                  <label className="text-sm text-[#00B4D8]">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                    className="w-full px-4 py-3 bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] rounded-md focus:outline-none focus:bg-[rgba(0,180,216,0.2)] transition-all text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1 mb-4">
                  <label className="text-sm text-[#00B4D8]">University / Company</label>
                  <input
                    type="text"
                    placeholder="Your affiliation"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="w-full px-4 py-3 bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] rounded-md focus:outline-none focus:bg-[rgba(0,180,216,0.2)] transition-all text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1 mb-4">
                  <label className="text-sm text-[#00B4D8]">Role</label>
                  <input
                    type="text"
                    placeholder="Your role or title"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] rounded-md focus:outline-none focus:bg-[rgba(0,180,216,0.2)] transition-all text-white placeholder-gray-400"
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-1 mb-4">
              <label className="text-sm text-[#00B4D8]">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] rounded-md focus:outline-none focus:bg-[rgba(0,180,216,0.2)] transition-all text-white placeholder-gray-400"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00B4D8] text-white font-medium rounded-md hover:bg-[#0096b4] transition-all disabled:opacity-50 mt-6"
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
              <p className="text-xs text-gray-400 text-center mt-4">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-[#00B4D8] text-sm mb-2">Verification Required</div>
              <p className="text-gray-400">Enter the OTP sent to {formData.email}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-[#00B4D8]">One-Time Password</label>
              <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] rounded-md focus:outline-none focus:bg-[rgba(0,180,216,0.2)] transition-all text-white placeholder-gray-400"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00B4D8] text-white font-medium rounded-md hover:bg-[#0096b4] transition-all disabled:opacity-50 mt-6"
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