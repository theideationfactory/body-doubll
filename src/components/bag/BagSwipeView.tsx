import React, { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, PartyPopper } from 'lucide-react';
import type { Bag, BagItem, BagSection } from '../../types/bag';

interface BagSwipeViewProps {
  bags: Bag[];
  onClose: () => void;
}

export function BagSwipeView({ bags, onClose }: BagSwipeViewProps) {
  const [currentBagIndex, setCurrentBagIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<BagItem[]>([]);
  const [needsAttentionItems, setNeedsAttentionItems] = useState<BagItem[]>([]);
  const [showTransitionCard, setShowTransitionCard] = useState(false);
  const [showCompletionCard, setShowCompletionCard] = useState(false);

  const childRefs = useRef<any[]>([]);

  const currentBag = bags[currentBagIndex];
  const items = currentBag.sections 
    ? currentBag.sections.flatMap(section => 
        section.items.map(item => ({ ...item, section: section.name }))
      )
    : currentBag.items || [];
  const currentItem = items[currentItemIndex];

  const swipe = async (dir: 'left' | 'right') => {
    if (childRefs.current[currentItemIndex]) {
      await childRefs.current[currentItemIndex].swipe(dir);
    }
  };

  const handleSwipe = (direction: string) => {
    if (direction === 'right') {
      setCheckedItems(prev => [...prev, currentItem]);
    } else {
      setNeedsAttentionItems(prev => [...prev, currentItem]);
    }

    if (currentItemIndex === items.length - 1) {
      if (currentBagIndex === bags.length - 1) {
        setShowCompletionCard(true);
      } else {
        setShowTransitionCard(true);
      }
    } else {
      setCurrentItemIndex(prev => prev + 1);
    }
  };

  const handleTransitionComplete = () => {
    setShowTransitionCard(false);
    setCurrentBagIndex(prev => prev + 1);
    setCurrentItemIndex(0);
  };

  const renderItemCard = (item: BagItem, index: number) => (
    <TinderCard
      ref={(el) => childRefs.current[index] = el}
      key={item.id}
      onSwipe={(dir) => handleSwipe(dir)}
      className="absolute w-full"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`bg-gradient-to-br ${currentBag.gradient} p-8 rounded-2xl shadow-xl`}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-6xl">{currentBag.icon}</span>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">{item.name}</h3>
            {item.section && (
              <p className="text-lg text-white/80">{item.section}</p>
            )}
          </div>
        </div>
      </motion.div>
    </TinderCard>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="relative w-full max-w-lg mx-4 h-[600px]">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white"
        >
          <span className="text-sm">ESC</span>
        </button>

        <div className="absolute inset-y-0 -left-20 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swipe('left')}
            className="group relative p-6 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 transition-all duration-300 backdrop-blur-sm border border-red-500/30"
          >
            <div className="absolute inset-0 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <X size={32} className="relative text-red-400 group-hover:text-red-300 transition-colors" />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 -right-20 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swipe('right')}
            className="group relative p-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300 backdrop-blur-sm border border-emerald-500/30"
          >
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Check size={32} className="relative text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          </motion.button>
        </div>

        <div className="relative h-full">
          <AnimatePresence>
            {showCompletionCard ? (
              <motion.div
                key="completion"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-violet-500/30 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <PartyPopper className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Bag check complete!
                  </h3>
                  <p className="text-violet-200 mb-6">
                    Ready to review your items?
                  </p>
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl text-white shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 mx-auto"
                  >
                    <ArrowRight size={20} />
                    Show Summary
                  </button>
                </div>
              </motion.div>
            ) : showTransitionCard ? (
              <motion.div
                key="transition"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-emerald-500/30 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <PartyPopper className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {currentBag.name} complete!
                  </h3>
                  <p className="text-emerald-200 mb-6">
                    Ready to check your next bag?
                  </p>
                  <button
                    onClick={handleTransitionComplete}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 mx-auto"
                  >
                    <ArrowRight size={20} />
                    Continue
                  </button>
                </div>
              </motion.div>
            ) : (
              items.map((item, index) => 
                index === currentItemIndex && renderItemCard(item, index)
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}