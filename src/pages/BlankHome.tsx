import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function BlankHome() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Sign Out Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleSignOut}
          className="group relative px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-5 h-5 text-white/80 group-hover:text-white" />
            <span className="text-white/80 group-hover:text-white font-medium">
              Sign Out
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}