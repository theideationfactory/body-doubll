import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BasicNeedsCard } from './BasicNeedsCard';
import { NeedsSummaryCard } from './NeedsSummaryCard';
import type { BasicNeed } from '../../types/needs';

const basicNeeds: BasicNeed[] = [
  {
    id: 'hunger',
    title: 'Are you hungry?',
    icon: 'hunger',
    gradient: 'bg-gradient-to-br from-orange-400 to-amber-500',
    actionText: 'Take time to eat something'
  },
  {
    id: 'thirst',
    title: 'Could you use some water?',
    icon: 'thirst',
    gradient: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    actionText: 'Have a drink of water'
  },
  {
    id: 'fatigue',
    title: 'Are you feeling tired?',
    icon: 'fatigue',
    gradient: 'bg-gradient-to-br from-violet-400 to-purple-500',
    actionText: 'Take a short rest'
  },
  {
    id: 'restless',
    title: 'Do you need to move?',
    icon: 'restless',
    gradient: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    actionText: 'Get up and stretch'
  },
  {
    id: 'focus',
    title: 'Having trouble focusing?',
    icon: 'focus',
    gradient: 'bg-gradient-to-br from-rose-400 to-pink-500',
    actionText: 'Take a mindful moment'
  },
  {
    id: 'environment',
    title: 'Is your space comfortable?',
    icon: 'environment',
    gradient: 'bg-gradient-to-br from-indigo-400 to-blue-500',
    actionText: 'Adjust your environment'
  }
];

interface NeedsCardStackProps {
  onComplete: () => void;
}

export function NeedsCardStack({ onComplete }: NeedsCardStackProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(basicNeeds.length - 1);
  const [identifiedNeeds, setIdentifiedNeeds] = useState<BasicNeed[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const currentNeed = basicNeeds[currentIndex];

  const handleResponse = (isYes: boolean) => {
    if (isYes) {
      setIdentifiedNeeds(prev => [...prev, currentNeed]);
    }

    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleSummaryComplete = () => {
    // Navigate to timer page after completing needs assessment
    navigate('/timer');
  };

  return (
    <div className="relative w-full h-[70vh]">
      <AnimatePresence mode="wait">
        {showSummary ? (
          <NeedsSummaryCard
            identifiedNeeds={identifiedNeeds}
            onComplete={handleSummaryComplete}
          />
        ) : (
          <BasicNeedsCard
            need={currentNeed}
            onResponse={handleResponse}
          />
        )}
      </AnimatePresence>
    </div>
  );
}