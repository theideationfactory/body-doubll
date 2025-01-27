import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface SymptomButtonProps {
  name: string;
  icon: string;
  onClick: () => void;
}

export function SymptomButton({ name, icon, onClick }: SymptomButtonProps) {
  // Safely get the icon component, fallback to a default if not found
  const Icon = (Icons as any)[icon] || Icons.Circle;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative w-full h-48 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Glowing orb effect */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl group-hover:bg-purple-400/40 transition-all duration-500" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-violet-500/30 rounded-full blur-2xl group-hover:bg-violet-400/40 transition-all duration-500" />

      {/* Border gradient */}
      <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-fuchsia-500/10 group-hover:from-purple-500/20 group-hover:via-violet-500/20 group-hover:to-fuchsia-500/20 transition-all duration-500" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center gap-6 p-6">
        {/* Icon container with pulsing effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse" />
          <div className="relative p-4 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 group-hover:from-purple-400 group-hover:to-violet-400 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/25">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Text with gradient */}
        <div className="text-center">
          <h3 className="text-xl font-bold bg-gradient-to-br from-white via-purple-100 to-white bg-clip-text text-transparent group-hover:from-purple-100 group-hover:via-white group-hover:to-purple-100 transition-all duration-500">
            {name}
          </h3>
          <p className="mt-2 text-sm text-white/60 group-hover:text-white/80 transition-colors duration-500">
            Click to manage
          </p>
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
    </motion.button>
  );
}