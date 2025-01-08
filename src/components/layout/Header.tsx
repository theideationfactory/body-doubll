import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { authService } from '../../services/authService';

export function Header() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-gradient-to-b from-black/50 to-transparent">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {user?.displayName && (
            <span className="text-white/80">
              Welcome, {user.displayName}
            </span>
          )}
        </div>
        
        <button
          onClick={handleSignOut}
          className="group relative px-6 py-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
            <span className="text-red-400 group-hover:text-red-300 font-medium transition-colors">
              Sign Out
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}