import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { needIcons } from '../../utils/needIcons';
import type { BasicNeed } from '../../types/needs';

interface BasicNeedsCardProps {
  need: BasicNeed;
  onResponse: (isYes: boolean) => void;
}

export function BasicNeedsCard({ need, onResponse }: BasicNeedsCardProps) {
  const Icon = needIcons[need.icon];

  return (
    <motion.div
      className={`relative w-full h-[70vh] ${need.gradient} rounded-3xl p-8 shadow-xl overflow-hidden`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background effects */}
      <div 
        className="absolute inset-0 opacity-10 animate-pulse" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative h-full flex flex-col items-center justify-between py-12">
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150" />
            <div className="relative p-8 bg-white/20 rounded-full backdrop-blur-sm ring-1 ring-white/30">
              <Icon className="w-20 h-20 text-white" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            {need.title}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-between items-center gap-4 mt-8">
          <motion.button
            onClick={() => onResponse(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-3 p-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl backdrop-blur-sm border border-red-500/30 text-white transition-colors"
          >
            <X className="w-6 h-6" />
            <span className="text-lg font-medium">No</span>
          </motion.button>

          <motion.button
            onClick={() => onResponse(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-3 p-4 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl backdrop-blur-sm border border-emerald-500/30 text-white transition-colors"
          >
            <Check className="w-6 h-6" />
            <span className="text-lg font-medium">Yes</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}