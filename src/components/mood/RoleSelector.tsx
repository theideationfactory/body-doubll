import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoleSelectorProps {
  onSelect: (role: 'client' | 'doubll') => void;
}

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Who are you?</h3>
        <p className="text-white/60">Select your role to begin tracking your mood</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Client Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          
          <button
            onClick={() => onSelect('client')}
            className="relative w-full bg-black/30 backdrop-blur-xl p-8 rounded-2xl transition-all duration-300 border border-white/10 group-hover:border-amber-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300">
                <User className="w-12 h-12 text-white" />
              </div>
              <span className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-200 group-hover:from-amber-100 group-hover:to-yellow-100 transition-all duration-300">
                I am the Client
              </span>
            </div>
          </button>
        </motion.div>

        {/* Doubll Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          
          <button
            onClick={() => onSelect('doubll')}
            className="relative w-full bg-black/30 backdrop-blur-xl p-8 rounded-2xl transition-all duration-300 border border-white/10 group-hover:border-violet-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg group-hover:shadow-violet-500/25 transition-all duration-300">
                <Users className="w-12 h-12 text-white" />
              </div>
              <span className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-200 group-hover:from-violet-100 group-hover:to-purple-100 transition-all duration-300">
                I am the Doubll
              </span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* View Mood Log Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/mood/log')}
          className="group relative bg-white/10 backdrop-blur-xl px-8 py-4 rounded-2xl transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-amber-500/50 transition-colors duration-500" />
          
          <div className="relative flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 group-hover:from-amber-400 group-hover:to-yellow-400 transition-colors duration-500 shadow-lg group-hover:shadow-amber-500/25">
              <ClipboardList className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-semibold text-white group-hover:text-amber-200 transition-colors duration-500">
              View Mood Log
            </span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}