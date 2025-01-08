import React, { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { Need } from '../../types/needs';
import { NeedsSummary } from './NeedsSummary';
import { TransitionCard } from './TransitionCard';

interface SwipeViewProps {
  needs: Need[];
  onClose: () => void;
}

export function SwipeView({ needs, onClose }: SwipeViewProps) {
  const [currentStage, setCurrentStage] = useState<'primary' | 'subneeds' | 'completion'>('primary');
  const [currentIndex, setCurrentIndex] = useState(needs.length - 1);
  const [currentNeedIndex, setCurrentNeedIndex] = useState(0);
  const [registeredNeeds, setRegisteredNeeds] = useState<string[]>([]);
  const [registeredSubneeds, setRegisteredSubneeds] = useState<{ needId: string; subneed: string }[]>([]);
  const [showTransitionCard, setShowTransitionCard] = useState(false);
  const childRefs = useRef<any[]>([]);

  const swipe = async (dir: 'left' | 'right') => {
    if (childRefs.current[currentIndex]) {
      await childRefs.current[currentIndex].swipe(dir);
    }
  };

  const swiped = (direction: string, itemId: string) => {
    if (direction === 'right') {
      if (currentStage === 'primary') {
        setRegisteredNeeds(prev => [...prev, itemId]);
      } else if (currentStage === 'subneeds') {
        const currentNeed = needs.find(need => need.id === registeredNeeds[currentNeedIndex]);
        if (currentNeed) {
          setRegisteredSubneeds(prev => [...prev, { needId: currentNeed.id, subneed: itemId }]);
        }
      }
    }
    
    if (currentStage === 'primary' && currentIndex === 0) {
      setShowTransitionCard(true);
    } else if (currentStage === 'subneeds') {
      const currentNeed = needs.find(need => need.id === registeredNeeds[currentNeedIndex]);
      if (currentNeed && currentIndex === 0) {
        if (currentNeedIndex === registeredNeeds.length - 1) {
          setCurrentStage('completion');
        } else {
          setShowTransitionCard(true);
        }
      } else {
        setCurrentIndex(prev => prev - 1);
      }
    } else {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const outOfFrame = (idx: number) => {
    if (childRefs.current[idx]) {
      childRefs.current[idx].restoreCard();
    }
  };

  const handleTransitionComplete = () => {
    setShowTransitionCard(false);
    if (currentStage === 'primary') {
      setCurrentStage('subneeds');
      const firstNeed = needs.find(need => need.id === registeredNeeds[0]);
      setCurrentIndex(firstNeed?.checkInOptions.length - 1 || 0);
    } else {
      setCurrentNeedIndex(prev => prev + 1);
      const nextNeed = needs.find(need => need.id === registeredNeeds[currentNeedIndex + 1]);
      setCurrentIndex(nextNeed?.checkInOptions.length - 1 || 0);
    }
  };

  const renderCard = (need: Need, index: number) => (
    <TinderCard
      ref={(el) => childRefs.current[index] = el}
      key={need.id}
      onSwipe={(dir) => swiped(dir, need.id)}
      onCardLeftScreen={() => outOfFrame(index)}
      className="absolute w-full"
    >
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 min-h-[70vh] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
          <span className="text-8xl">{need.emoji}</span>
          <h3 className="text-3xl font-bold text-white leading-tight">{need.name}</h3>
          <p className="text-lg text-white/60 max-w-sm">
            Swipe right if yes, left if no
          </p>
        </div>
      </div>
    </TinderCard>
  );

  const renderSubneedCard = (subneed: string, index: number) => {
    const currentNeed = needs.find(need => need.id === registeredNeeds[currentNeedIndex]);
    if (!currentNeed) return null;

    return (
      <TinderCard
        ref={(el) => childRefs.current[index] = el}
        key={index}
        onSwipe={(dir) => swiped(dir, subneed)}
        onCardLeftScreen={() => outOfFrame(index)}
        className="absolute w-full"
      >
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 min-h-[70vh] flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <span className="text-4xl">{currentNeed.emoji}</span>
            <div className="space-y-4 text-center">
              <span className="text-lg font-medium text-violet-300">
                {currentNeed.name}
              </span>
              <h3 className="text-3xl font-bold text-white">
                {subneed}
              </h3>
              <p className="text-lg text-white/60 max-w-sm">
                Swipe right if yes, left if no
              </p>
            </div>
          </div>
        </div>
      </TinderCard>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg mx-4 h-[70vh]">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white"
        >
          <span className="text-sm">ESC</span>
        </button>

        <div className="absolute inset-y-0 -left-20 flex items-center">
          <button
            onClick={() => swipe('left')}
            className="group relative p-6 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 transition-all duration-300 backdrop-blur-sm border border-red-500/30"
          >
            <div className="absolute inset-0 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <X size={32} className="relative text-red-400 group-hover:text-red-300 transition-colors" />
          </button>
        </div>

        <div className="absolute inset-y-0 -right-20 flex items-center">
          <button
            onClick={() => swipe('right')}
            className="group relative p-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300 backdrop-blur-sm border border-emerald-500/30"
          >
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Check size={32} className="relative text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          </button>
        </div>

        <div className="relative h-full">
          <AnimatePresence>
            {currentStage === 'completion' ? (
              <NeedsSummary
                needs={needs}
                registeredNeeds={registeredNeeds}
                registeredSubneeds={registeredSubneeds}
                onClose={onClose}
              />
            ) : showTransitionCard ? (
              <TransitionCard onContinue={handleTransitionComplete} />
            ) : currentStage === 'primary' ? (
              needs.map((need, index) => 
                index === currentIndex && renderCard(need, index)
              )
            ) : currentStage === 'subneeds' ? (
              needs.find(need => need.id === registeredNeeds[currentNeedIndex])?.checkInOptions.map((subneed, index) =>
                index === currentIndex && renderSubneedCard(subneed, index)
              )
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}