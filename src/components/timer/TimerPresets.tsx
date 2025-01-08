import React from 'react';
import { Timer, Brain, Coffee, Book, Dumbbell } from 'lucide-react';
import { TimerPreset } from '../../types/timer';

const defaultPresets: TimerPreset[] = [
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    description: '25 minutes focused work',
    duration: 1500000,
    category: 'work',
    color: 'from-red-500 to-rose-500',
    icon: 'Timer'
  },
  {
    id: 'short-break',
    name: 'Short Break',
    description: '5 minutes rest',
    duration: 300000,
    category: 'break',
    color: 'from-green-500 to-emerald-500',
    icon: 'Coffee'
  },
  {
    id: 'study',
    name: 'Study Session',
    description: '45 minutes learning',
    duration: 2700000,
    category: 'study',
    color: 'from-blue-500 to-indigo-500',
    icon: 'Book'
  },
  {
    id: 'exercise',
    name: 'Exercise',
    description: '30 minutes workout',
    duration: 1800000,
    category: 'fitness',
    color: 'from-purple-500 to-violet-500',
    icon: 'Dumbbell'
  }
];

const iconMap: Record<string, React.ComponentType<any>> = {
  Timer,
  Brain,
  Coffee,
  Book,
  Dumbbell
};

interface TimerPresetsProps {
  onSelect: (preset: TimerPreset) => void;
}

export function TimerPresets({ onSelect }: TimerPresetsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {defaultPresets.map(preset => {
        const Icon = iconMap[preset.icon || 'Timer'];
        return (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={`group relative bg-gradient-to-br ${preset.color} p-6 rounded-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center gap-3">
              <Icon className="w-8 h-8 text-white" />
              <div className="text-center">
                <h3 className="text-lg font-bold text-white">{preset.name}</h3>
                <p className="text-sm text-white/80">{preset.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}