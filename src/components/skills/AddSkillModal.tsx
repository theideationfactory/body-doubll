import React, { useState } from 'react';
import { X, Plus, Pencil } from 'lucide-react';
import { SkillSelectionView } from './SkillSelectionView';
import { CustomSkillView } from './CustomSkillView';

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (skills: Array<{ name: string; icon: string }>) => void;
}

type View = 'initial' | 'category' | 'custom';

export function AddSkillModal({ isOpen, onClose, onAdd }: AddSkillModalProps) {
  const [currentView, setCurrentView] = useState<View>('initial');

  const handleSkillsAdd = (skills: Array<{ name: string; icon: string }>) => {
    onAdd(skills);
    onClose();
  };

  if (!isOpen) return null;

  const renderView = () => {
    switch (currentView) {
      case 'category':
        return (
          <SkillSelectionView
            onBack={() => setCurrentView('initial')}
            onSelect={handleSkillsAdd}
          />
        );
      case 'custom':
        return (
          <CustomSkillView
            onBack={() => setCurrentView('initial')}
            onAdd={(skill) => handleSkillsAdd([skill])}
          />
        );
      default:
        return (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setCurrentView('category')}
                className="group relative bg-white/10 backdrop-blur-xl p-6 rounded-xl transition-all duration-300 hover:bg-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Choose from Categories</h3>
                    <p className="text-sm text-white/60">Select from our curated list of skills</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('custom')}
                className="group relative bg-white/10 backdrop-blur-xl p-6 rounded-xl transition-all duration-300 hover:bg-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                    <Pencil className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">Create Custom Skill</h3>
                    <p className="text-sm text-white/60">Define your own skill and choose an icon</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Add New Skills</h2>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {renderView()}
      </div>
    </div>
  );
}