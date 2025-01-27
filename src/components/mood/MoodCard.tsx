import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MoodCardProps {
  icon: LucideIcon;
  name: string;
  gradient: string;
  onClick: () => void;
  selected?: boolean;
}

export function MoodCard({ icon: Icon, name, gradient, onClick, selected }: MoodCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative w-full bg-gradient-to-br ${gradient} p-6 rounded-2xl transition-all duration-300 ${
        selected ? 'ring-2 ring-white shadow-lg' : ''
      }`}
    >
      <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex flex-col items-center gap-4">
        <Icon className="w-12 h-12 text-white" />
        <span className="text-lg font-medium text-white">{name}</span>
      </div>
    </motion.button>
  );
}