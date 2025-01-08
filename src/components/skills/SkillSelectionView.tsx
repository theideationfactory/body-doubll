import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, ArrowRight } from 'lucide-react';
import { skillCategories } from '../../types/skills';
import * as Icons from 'lucide-react';

interface SkillSelectionViewProps {
  onBack: () => void;
  onSelect: (skills: Array<{ name: string; icon: string }>) => void;
}

export function SkillSelectionView({ onBack, onSelect }: SkillSelectionViewProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Array<{ name: string; icon: string }>>([]);

  const handleSkillSelect = (skill: { name: string; icon: string }) => {
    const exists = selectedSkills.some(s => s.name === skill.name);
    if (!exists) {
      setSelectedSkills(prev => [...prev, skill]);
    } else {
      setSelectedSkills(prev => prev.filter(s => s.name !== skill.name));
    }
  };

  const handleSubmit = () => {
    if (selectedSkills.length > 0) {
      onSelect(selectedSkills);
    }
  };

  return (
    <div className="flex flex-col h-[calc(90vh-120px)]">
      {/* Header */}
      <div className="flex-none p-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {skillCategories.map(category => (
            <div key={category.id} className="space-y-2">
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === category.id ? null : category.id
                )}
                className="w-full flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <span className="text-lg font-medium text-white">{category.name}</span>
                <ChevronRight
                  size={20}
                  className={`text-white/60 transition-transform duration-200 ${
                    expandedCategory === category.id ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {expandedCategory === category.id && (
                <div className="ml-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.subskills.map(skill => {
                    const isSelected = selectedSkills.some(s => s.name === skill.name);
                    const Icon = (Icons as any)[skill.icons[0]];
                    
                    return (
                      <button
                        key={skill.id}
                        onClick={() => handleSkillSelect({ name: skill.name, icon: skill.icons[0] })}
                        className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                          isSelected
                            ? 'bg-blue-500/30 ring-2 ring-blue-500'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                        <span className="text-white">{skill.name}</span>
                        {isSelected && (
                          <Plus size={16} className="ml-auto text-blue-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Footer */}
      {selectedSkills.length > 0 && (
        <div className="flex-none p-6 bg-slate-900/95 backdrop-blur-sm border-t border-white/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                Selected Skills ({selectedSkills.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => {
                const Icon = (Icons as any)[skill.icon];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg"
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">{skill.name}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <ArrowRight size={20} />
              Add Selected Skills
            </button>
          </div>
        </div>
      )}
    </div>
  );
}