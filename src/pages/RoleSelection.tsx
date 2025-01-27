import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users } from 'lucide-react';

export function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center space-y-8 mb-12">
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt" />
            
            <div className="relative flex items-center justify-center gap-4">
              <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 tracking-tight">
                Doubll
              </h1>
              <span className="text-6xl font-light text-white">♊</span>
            </div>
          </div>
          <p className="text-2xl font-medium text-white/80 italic">
            Choose your role to get started
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client Button */}
          <button
            onClick={() => navigate('/login')}
            className="group relative bg-white/10 backdrop-blur-xl p-12 rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-amber-500/50 transition-colors duration-500" />
            
            <div className="relative flex flex-col items-center gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg group-hover:shadow-amber-500/25 transition-all duration-500">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-white">I Need Support</h2>
                <p className="text-lg text-white/60">
                  Get help with tasks and daily activities
                </p>
              </div>
            </div>
          </button>

          {/* Doubll Button */}
          <button
            onClick={() => navigate('/login/double')}
            className="group relative bg-white/10 backdrop-blur-xl p-12 rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-violet-500/50 transition-colors duration-500" />
            
            <div className="relative flex flex-col items-center gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg group-hover:shadow-violet-500/25 transition-all duration-500">
                <Users className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-white">I'm a Body Double</h2>
                <p className="text-lg text-white/60">
                  Provide support and assistance to others
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}