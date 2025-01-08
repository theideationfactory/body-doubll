import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, ArrowRight } from 'lucide-react';

interface TransitionCardProps {
  onContinue: () => void;
}

export function TransitionCard({ onContinue }: TransitionCardProps) {
  return (
    <motion.div
      key="transition"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-emerald-500/30 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <PartyPopper className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Let's check your specific needs!
        </h3>
        <p className="text-emerald-200 mb-6">
          Ready to dive deeper?
        </p>
        <button
          onClick={onContinue}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 mx-auto"
        >
          <ArrowRight size={20} />
          Continue
        </button>
      </div>
    </motion.div>
  );
}