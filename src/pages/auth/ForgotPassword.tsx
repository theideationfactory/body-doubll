import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="card text-center space-y-6">
            <h2 className="text-2xl font-bold text-text mb-4">Check Your Email</h2>
            <p className="text-text/80">
              We've sent password reset instructions to {email}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Return to Login
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text">Reset Password</h1>
            <p className="mt-2 text-text/60">Enter your email to receive reset instructions</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text/80 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full pl-11"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-text rounded-full animate-spin" />
              ) : (
                <>
                  Send Reset Instructions
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => navigate('/login')}
            className="mt-6 flex items-center gap-2 text-text/60 hover:text-text transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}