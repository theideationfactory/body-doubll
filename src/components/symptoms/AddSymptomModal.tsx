import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import * as Icons from 'lucide-react';

interface AddSymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (symptom: { name: string; icon: string }) => void;
}

export function AddSymptomModal({ isOpen, onClose, onAdd }: AddSymptomModalProps) {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string>('');

  const symptomIcons = {
    Brain: Icons.Brain,
    Heart: Icons.Heart,
    Eye: Icons.Eye,
    Stethoscope: Icons.Stethoscope,
    Thermometer: Icons.Thermometer,
    Pill: Icons.Pill,
    Activity: Icons.Activity,
    Waves: Icons.Waves,
    Zap: Icons.Zap,
    Moon: Icons.Moon,
    Sun: Icons.Sun,
    Cloud: Icons.Cloud
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && selectedIcon) {
      onAdd({ name, icon: selectedIcon });
      setName('');
      setSelectedIcon('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Add Symptom</h2>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Symptom Name Input */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Symptom Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter symptom name"
              required
            />
          </div>

          {/* Icon Grid */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">
              Select Icon
            </label>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(symptomIcons).map(([iconName, Icon]) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setSelectedIcon(iconName)}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    selectedIcon === iconName
                      ? 'bg-purple-500/30 ring-2 ring-purple-500'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="w-6 h-6 text-white" />
                    <span className="text-xs text-white/60 truncate w-full text-center">
                      {iconName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name || !selectedIcon}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={20} />
            Add Symptom
          </button>
        </form>
      </div>
    </div>
  );
}