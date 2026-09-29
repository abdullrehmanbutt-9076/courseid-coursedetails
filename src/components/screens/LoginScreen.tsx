import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, GraduationCap, AlertCircle, ArrowRight } from 'lucide-react';
import { UserSession } from '../../types/navigation';

interface LoginScreenProps {
  onLoginSuccess: (user: UserSession) => void;
  onNavigateToSignup: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToSignup
}) => {
  const [email, setEmail] = useState('abdullah@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const userName = email.includes('@') 
      ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
      : 'Abdullah';

    const user: UserSession = {
      fullName: userName,
      email: email.trim(),
      phoneNumber: '+1 (555) 349-8201',
      studentId: 'STU-88294',
      enrolledCourseIds: ['PY101', 'WD101'],
      isAuthenticated: true
    };

    onLoginSuccess(user);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-50 text-slate-900 overflow-y-auto">
      <div className="my-auto py-4">
        {/* App Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">EduPulse</h1>
          <p className="text-xs text-slate-500 font-medium">Jetpack Compose Course App</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs transition"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs transition"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Hint */}
        <div className="mt-4 p-2.5 bg-indigo-50/60 rounded-xl border border-indigo-100/70 text-[11px] text-indigo-800 text-center">
          <span className="font-semibold">Quick Test:</span> Ready to log in with default student account.
        </div>
      </div>

      {/* Signup link */}
      <div className="text-center pt-2 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          Don't have an account?{' '}
          <button
            onClick={onNavigateToSignup}
            className="font-bold text-indigo-600 hover:text-indigo-800 ml-1 cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>

      {/* Material 3 Forgot Password Dialog */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Reset Password</h3>
            <p className="text-xs text-slate-600 mt-2">
              {forgotSent
                ? `A password recovery link has been dispatched to ${email}.`
                : `Enter your email address to receive a secure login reset token.`}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Close
              </button>
              {!forgotSent && (
                <button
                  onClick={() => setForgotSent(true)}
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg cursor-pointer"
                >
                  Send Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
