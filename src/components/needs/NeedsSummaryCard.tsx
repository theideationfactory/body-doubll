import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, ArrowRight, Check, Sparkles } from 'lucide-react';
import { needIcons } from '../../utils/needIcons';
import type { BasicNeed } from '../../types/needs';

interface NeedsSummaryCardProps {
  identifiedNeeds: BasicNeed[];
  onComplete: () => void;
}

export function NeedsSummaryCard({ identifiedNeeds, onComplete }: NeedsSummaryCardProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const allItemsChecked = identifiedNeeds.length > 0 && 
    identifiedNeeds.every(need => checkedItems[need.id]);

  const toggleCheck = (needId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [needId]: !prev[needId]
    }));
  };

  // Calculate progress percentage
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalNeeds = identifiedNeeds.length;
  const progressPercentage = totalNeeds > 0 ? (checkedCount / totalNeeds) * 100 : 0;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full mx-auto mb-6 flex items-center justify-center ring-4 ring-violet-500/20">
            {identifiedNeeds.length > 0 ? (
              <PartyPopper className="w-10 h-10 text-white" />
            ) : (
              <Sparkles className="w-10 h-10 text-white" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-white">
            {identifiedNeeds.length > 0 ? "Here's what needs attention!" : "You're all set!"}
          </h3>
          {identifiedNeeds.length > 0 && (
            <p className="text-white/60 mt-2">Check off items as you address them</p>
          )}
        </div>

        {/* Progress Bar */}
        {identifiedNeeds.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/60">Progress</span>
              <span className="text-sm font-medium text-white">
                {checkedCount} of {totalNeeds} complete
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}

        {/* Need Items */}
        <AnimatePresence mode="popLayout">
          {identifiedNeeds.length > 0 ? (
            <motion.div className="space-y-4 mb-8">
              {identifiedNeeds.map((need, index) => {
                const Icon = needIcons[need.icon];
                const isChecked = checkedItems[need.id];
                
                return (
                  <motion.div
                    key={need.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => toggleCheck(need.id)}
                      className={`group relative w-full overflow-hidden ${need.gradient} rounded-xl transition-all duration-300 ${
                        isChecked ? 'opacity-75' : ''
                      }`}
                    >
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative p-4 flex items-center gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${
                          isChecked
                            ? 'bg-white/30 ring-2 ring-white'
                            : 'bg-white/20'
                        } flex items-center justify-center transition-all duration-300`}>
                          {isChecked ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <motion.div 
                              className="w-3 h-3 bg-white/50 rounded-sm"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </div>

                        <div className="flex items-center gap-3 flex-grow">
                          <Icon className="w-6 h-6 text-white" />
                          <span className={`text-lg text-white transition-all duration-300 ${
                            isChecked ? 'line-through opacity-80' : ''
                          }`}>
                            {need.actionText}
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/60 mb-8"
            >
              No immediate needs identified. Great job taking care of yourself!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.button
          onClick={onComplete}
          className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-white transition-all duration-300 ${
            allItemsChecked
              ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400'
              : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{allItemsChecked ? 'All Done!' : 'Continue'}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}