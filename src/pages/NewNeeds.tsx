import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { NavigationStrip } from '../components/NavigationStrip';
import { NeedsCardStack } from '../components/needs/NeedsCardStack';

export function NewNeeds() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-pink-900 p-4 sm:p-8 pt-24">
      <NavigationStrip />
      
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <NeedsCardStack onComplete={() => navigate('/needs')} />
      </div>
    </div>
  );
}