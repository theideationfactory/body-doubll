import React from 'react';

interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthForm({ children, onSubmit }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10">
      {children}
    </form>
  );
}