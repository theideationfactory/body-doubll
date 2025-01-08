import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';
import { Emotion } from '../../types/mood';

interface EmotionSelectorProps {
  emotions: Emotion[];
  selectedEmotions: Emotion[];
  onSelect: (emotion: Emotion) => void;
  gradient: string;
}

export function EmotionSelector({ emotions, selectedEmotions, onSelect, gradient }: EmotionSelectorProps) {
  const [newEmotion, setNewEmotion] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [customEmotions, setCustomEmotions] = useState<Emotion[]>(() => {
    const saved = localStorage.getItem('customEmotions');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter out any invalid emotions
  const validEmotions = emotions.filter(emotion => emotion && emotion.id && emotion.name);
  const validCustomEmotions = customEmotions.filter(emotion => emotion && emotion.id && emotion.name);

  const handleAddEmotion = () => {
    if (newEmotion.trim()) {
      const customEmotion: Emotion = {
        id: `custom-${Date.now()}`,
        name: newEmotion.trim()
      };

      const updatedCustomEmotions = [...customEmotions, customEmotion];
      setCustomEmotions(updatedCustomEmotions);
      localStorage.setItem('customEmotions', JSON.stringify(updatedCustomEmotions));

      onSelect(customEmotion);
      setNewEmotion('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddEmotion();
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {/* Predefined Emotions */}
      {validEmotions.map((emotion) => {
        const isSelected = selectedEmotions.some(e => e.id === emotion.id);
        return (
          <motion.button
            key={emotion.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(emotion)}
            className={`relative group p-4 rounded-xl border-2 transition-all duration-300 ${
              isSelected
                ? `bg-gradient-to-br ${gradient} border-white`
                : 'bg-white/5 border-white/20 hover:border-white/40'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-white rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-black" />
                </motion.div>
              )}
              <span className={`text-lg ${isSelected ? 'text-white' : 'text-white/80'}`}>
                {emotion.name}
              </span>
            </div>
          </motion.button>
        );
      })}

      {/* Custom Emotions */}
      {validCustomEmotions.map((emotion) => {
        const isSelected = selectedEmotions.some(e => e.id === emotion.id);
        return (
          <motion.button
            key={emotion.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(emotion)}
            className={`relative group p-4 rounded-xl border-2 transition-all duration-300 ${
              isSelected
                ? 'bg-gradient-to-br from-gray-500 to-slate-500 border-white'
                : 'bg-white/5 border-white/20 hover:border-white/40'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-white rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-black" />
                </motion.div>
              )}
              <span className={`text-lg ${isSelected ? 'text-white' : 'text-white/80'}`}>
                {emotion.name}
              </span>
            </div>
          </motion.button>
        );
      })}

      {/* Add Custom Emotion Button/Input */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative group p-4 rounded-xl border-2 transition-all duration-300 bg-gradient-to-br from-gray-500/20 to-slate-500/20 ${
          isAdding ? 'border-white' : 'border-white/20 hover:border-white/40'
        }`}
      >
        {isAdding ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newEmotion}
              onChange={(e) => setNewEmotion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter new emotion..."
              className="flex-grow bg-transparent text-white placeholder-white/50 outline-none"
              autoFocus
            />
            <div className="flex items-center gap-1">
              <button
                onClick={handleAddEmotion}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Check className="w-4 h-4 text-emerald-400" />
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewEmotion('');
                }}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center gap-3 text-white/80"
          >
            <Plus className="w-5 h-5" />
            <span className="text-lg">Add Custom</span>
          </button>
        )}
      </motion.div>
    </div>
  );
}