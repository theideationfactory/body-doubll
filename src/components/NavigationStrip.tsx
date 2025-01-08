import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Timer, Trophy, Heart, Users, SmilePlus, Stethoscope } from 'lucide-react';

export function NavigationStrip() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/mood', icon: SmilePlus, label: 'Mood', color: 'from-amber-500 to-yellow-500' },
    { path: '/new-needs', icon: Heart, label: 'Needs', color: 'from-pink-500 to-rose-500' },
    { path: '/timer', icon: Timer, label: 'Timer', color: 'from-cyan-500 to-teal-500' },
    { path: '/skills', icon: Trophy, label: 'Skills', color: 'from-blue-500 to-indigo-500' },
    { path: '/doubll', icon: Users, label: 'Doubll', color: 'from-violet-500 to-fuchsia-500' },
    { path: '/symptoms', icon: Stethoscope, label: 'Symptoms', color: 'from-purple-500 to-violet-500' }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-2">
      <div className="max-w-2xl mx-auto">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-2 shadow-lg border border-white/20">
          <div className="grid grid-cols-6 gap-2">
            {navigationItems.map(({ path, icon: Icon, label, color }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`relative group px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${color} text-white shadow-lg`
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                  {!isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}