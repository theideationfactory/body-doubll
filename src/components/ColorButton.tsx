import React from 'react';
import { Trophy } from 'lucide-react';

interface ColorButtonProps {
  color: string;
  hoverColor: string;
  label: string;
  points: number;
  onPointsAdd: () => void;
  children: React.ReactNode;
  isShadowSkill?: boolean;
  description?: string;
}

export function ColorButton({ 
  color, 
  hoverColor, 
  label, 
  points, 
  onPointsAdd, 
  children, 
  isShadowSkill = false,
  description
}: ColorButtonProps) {
  const isMastered = points >= 5;

  const getDescription = () => {
    switch (label) {
      case 'Fluidity':
        return 'No anxiety or distraction, just focus';
      case 'Imagination':
        return 'Characters, drama, big ideas';
      case 'Fun':
        return 'Playful jokes, interesting musings';
      case 'Time Management':
        return 'Starting and following up with timers';
      case 'Priority Management':
        return 'Doing tasks that are highest priority first';
      case 'Calendaring':
        return 'Checking in with calendar consistently';
      case 'Compassion':
        return 'Having grace for mistakes and failure';
      case 'Self-Advocacy':
        return 'Asking for needs, bringing up bothers';
      case 'Transitions':
        return 'Properly saving, packing up and checking in';
      default:
        return description;
    }
  };

  return (
    <div className="relative group">
      {/* Glowing effect */}
      <div className={`absolute -inset-0.5 ${color} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`} />
      
      <button 
        onClick={onPointsAdd}
        className={`relative ${color} ${hoverColor} w-full aspect-square rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-between gap-2 group overflow-hidden p-4`}
      >
        {/* Shiny overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Skill Name */}
        <span className="text-white/90 group-hover:text-white text-sm font-medium text-center px-2 transition-colors duration-300">
          {label}
        </span>

        {/* Icon */}
        <div className="text-white/90 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
          {children}
        </div>
        
        {/* Description */}
        <p className="text-white/70 group-hover:text-white/90 text-xs text-center transition-colors duration-300 line-clamp-2">
          {getDescription()}
        </p>

        {/* Points Display */}
        {points > 0 && (
          <div className="flex items-center gap-1">
            {Array.from({ length: points }).map((_, index) => (
              <div
                key={index}
                className={`${
                  isShadowSkill
                    ? 'w-5 h-5 bg-gradient-to-r from-gray-400 to-gray-500 ring-gray-400/50 ring-offset-gray-100/10'
                    : 'w-5 h-5 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 ring-yellow-300/50 ring-offset-yellow-100/10'
                } shadow-lg flex items-center justify-center animate-pulse ring-2 ring-offset-1`}
              >
                <span className={`text-[10px] font-bold ${
                  isShadowSkill ? 'text-gray-900' : 'text-yellow-900'
                }`}>
                  {isShadowSkill ? 'SH' : 'DC'}
                </span>
              </div>
            ))}
          </div>
        )}

        {isMastered && !isShadowSkill && (
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <Trophy size={14} className="text-yellow-900" strokeWidth={2.5} />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}