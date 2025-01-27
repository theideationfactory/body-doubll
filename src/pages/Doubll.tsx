import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, Users, UserPlus } from 'lucide-react';
import { ReceiverProfileModal } from '../components/doubll/ReceiverProfileModal';
import { NavigationStrip } from '../components/NavigationStrip';

interface ReceiverProfile {
  name: string;
  location: string;
  age: string;
  pronouns: string;
  services: string[];
  matchTypes: string[];
  availability: string;
}

export function Doubll() {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState<ReceiverProfile | null>(() => {
    const saved = localStorage.getItem('receiverProfile');
    return saved ? JSON.parse(saved) : null;
  });

  const handleProfileSubmit = (newProfile: ReceiverProfile) => {
    setProfile(newProfile);
    localStorage.setItem('receiverProfile', JSON.stringify(newProfile));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 flex items-center justify-center p-4 relative overflow-hidden pt-24">
      <NavigationStrip />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-full blur-3xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-fuchsia-500/30 to-pink-500/30 rounded-full blur-3xl opacity-70 animate-pulse" />
        
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl w-full space-y-12 relative z-10">
        <div className="absolute top-0 left-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-4">
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
              Find your perfect body double match
            </p>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 mx-auto rounded-full" />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setShowProfileModal(true)}
            className="group relative bg-white/10 backdrop-blur-xl px-8 py-4 rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors duration-500" />
            
            <div className="relative flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-colors duration-500 shadow-lg group-hover:shadow-violet-500/25">
                <UserPlus className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-semibold text-white group-hover:text-violet-200 transition-colors duration-500">
                {profile ? 'Update Profile' : 'Create Receiver Profile'}
              </span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <button className="group relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors duration-500" />
            
            <div className="relative flex flex-col items-center gap-6">
              <div className="p-5 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-colors duration-500 shadow-lg group-hover:shadow-violet-500/25">
                <UserCheck className="w-14 h-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold text-white group-hover:text-violet-200 transition-colors duration-500">
                  Professional Match
                </h2>
                <p className="text-lg text-violet-200/60 group-hover:text-violet-200/80 transition-colors duration-500">
                  Connect with a local professional body double
                </p>
              </div>
            </div>
          </button>

          <button className="group relative bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors duration-500" />
            
            <div className="relative flex flex-col items-center gap-6">
              <div className="p-5 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 group-hover:from-fuchsia-400 group-hover:to-pink-400 transition-colors duration-500 shadow-lg group-hover:shadow-fuchsia-500/25">
                <Users className="w-14 h-14 text-white" strokeWidth={1.5} />
              </div>
              <div className="space-y-3 text-center">
                <h2 className="text-3xl font-bold text-white group-hover:text-fuchsia-200 transition-colors duration-500">
                  Friendly Match
                </h2>
                <p className="text-lg text-fuchsia-200/60 group-hover:text-fuchsia-200/80 transition-colors duration-500">
                  Connect with a friendly community body double
                </p>
              </div>
            </div>
          </button>
        </div>

        <ReceiverProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onSubmit={handleProfileSubmit}
        />
      </div>
    </div>
  );
}