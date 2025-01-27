import React from 'react';
import { MoodCard } from './MoodCard';
import { EmotionSelector } from './EmotionSelector';
import { MoodSummary } from './MoodSummary';
import { RoleSelector } from './RoleSelector';
import { primaryMoods } from '../../data/moods';
import type { MoodSelection, PrimaryMood, SpecificMood } from '../../types/mood';

interface MoodStepRendererProps {
  currentStep: 'role' | 'primary' | 'specific' | 'emotions' | 'summary';
  selection: MoodSelection;
  onRoleSelect: (role: 'client' | 'doubll') => void;
  onPrimaryMoodSelect: (mood: PrimaryMood) => void;
  onSpecificMoodSelect: (mood: SpecificMood) => void;
  onEmotionSelect: (emotion: any) => void;
  onSaveMood: () => void;
}

export function MoodStepRenderer({
  currentStep,
  selection,
  onRoleSelect,
  onPrimaryMoodSelect,
  onSpecificMoodSelect,
  onEmotionSelect,
  onSaveMood
}: MoodStepRendererProps) {
  switch (currentStep) {
    case 'role':
      return <RoleSelector onSelect={onRoleSelect} />;
      
    case 'primary':
      return (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">How are you feeling?</h3>
            <p className="text-white/60">Select your primary mood state</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {primaryMoods.map(mood => (
              <MoodCard
                key={mood.id}
                icon={mood.icon}
                name={mood.name}
                gradient={mood.gradient}
                onClick={() => onPrimaryMoodSelect(mood)}
                selected={selection.primaryMood?.id === mood.id}
              />
            ))}
          </div>
        </div>
      );

    case 'specific':
      return selection.primaryMood ? (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">More specifically...</h3>
            <p className="text-white/60">Choose a specific mood that best describes how you feel</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {selection.primaryMood.specificMoods.map(mood => (
              <MoodCard
                key={mood.id}
                icon={mood.icon}
                name={mood.name}
                gradient={mood.gradient}
                onClick={() => onSpecificMoodSelect(mood)}
                selected={selection.specificMood?.id === mood.id}
              />
            ))}
          </div>
        </div>
      ) : null;

    case 'emotions':
      return selection.specificMood ? (
        <div className="space-y-8 pb-24">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Select Your Emotions</h3>
            <p className="text-white/60">Choose all emotions that apply to how you're feeling</p>
          </div>
          <EmotionSelector
            emotions={selection.specificMood.emotions}
            selectedEmotions={selection.selectedEmotions}
            onSelect={onEmotionSelect}
            gradient={selection.specificMood.gradient}
          />
          {selection.selectedEmotions.length > 0 && (
            <div className="fixed bottom-8 left-0 right-0 px-4 z-[60]">
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={onSaveMood}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null;

    case 'summary':
      return <MoodSummary selection={selection} onSave={onSaveMood} />;

    default:
      return null;
  }
}