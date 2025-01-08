import React from 'react';
import { motion } from 'framer-motion';
import { MoodSelection } from '../../types/mood';
import { ArrowRight } from 'lucide-react';

interface MoodSummaryProps {
  selection: MoodSelection;
  onSave: () => void;
}

export function MoodSummary({ selection, onSave }: MoodSummaryProps) {
  if (!selection.primaryMood || !selection.specificMood) return null;

  const { primaryMood, specificMood, selectedEmotions } = selection;
  const PrimaryIcon = primaryMood.icon;
  const SpecificIcon = specificMood.icon;

  return (
    <div className="space-y-8 pb-32"> {/* Added padding bottom for button space */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Your Mood Summary</h3>
        <p className="text-white/60">Here's an overview of how you're feeling</p>
      </div>

      <div className="space-y-6">
        {/* Primary Mood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${primaryMood.gradient} p-6 rounded-xl`}
        >
          <div className="flex items-center gap-4">
            <PrimaryIcon className="w-8 h-8 text-white" />
            <div>
              <p className="text-sm text-white/80">Primary Mood</p>
              <p className="text-lg font-medium text-white">{primaryMood.name}</p>
            </div>
          </div>
        </motion.div>

        {/* Specific Mood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-gradient-to-br ${specificMood.gradient} p-6 rounded-xl`}
        >
          <div className="flex items-center gap-4">
            <SpecificIcon className="w-8 h-8 text-white" />
            <div>
              <p className="text-sm text-white/80">Specific Mood</p>
              <p className="text-lg font-medium text-white">{specificMood.name}</p>
            </div>
          </div>
        </motion.div>

        {/* Emotions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <p className="text-sm text-white/80 mb-4">Selected Emotions</p>
          <div className="flex flex-wrap gap-2">
            {selectedEmotions.map((emotion) => (
              <span
                key={emotion.id}
                className={`px-3 py-1 rounded-full text-sm ${
                  specificMood.gradient.includes('from-')
                    ? `bg-gradient-to-r ${specificMood.gradient} text-white`
                    : 'bg-white/20 text-white'
                }`}
              >
                {emotion.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fixed Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-8 left-0 right-0 px-4 z-50"
      >
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onSave}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Save Mood Entry
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}