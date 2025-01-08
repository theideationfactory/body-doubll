import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmailConfirmationMessageProps {
  email: string;
}

export function EmailConfirmationMessage({ email }: EmailConfirmationMessageProps) {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-emerald-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-emerald-400 mb-2">
        Check Your Email
      </h3>
      
      <p className="text-white/80 mb-6">
        We've sent a confirmation link to <strong>{email}</strong>.<br />
        Please check your email and confirm your account before signing in.
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