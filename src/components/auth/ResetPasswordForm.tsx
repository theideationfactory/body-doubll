import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { AuthForm } from './AuthForm';
import { useResetPassword } from '../../hooks/useResetPassword';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const { resetPassword, error, isLoading } = useResetPassword();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      // Error handling is managed by the hook
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-emerald-400 mb-2">Check Your Email</h3>
        <p className="text-white/80 mb-4">
          We've sent password reset instructions to {email}
        </p>
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
        >
          Return to Login
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <AuthForm onSubmit={handleSubmit}>
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pl-11"
              placeholder="Enter your email"
              required
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </div>
          <p className="mt-2 text-sm text-white/60">
            We'll send password reset instructions to this email
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Send Reset Instructions
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </AuthForm>
  );
}