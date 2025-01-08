import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Need } from '../../types/needs';

interface NeedCardStackProps {
  needs: Need[];
  onClose: () => void;
  onQuickCheck: (id: string) => void;
  onDiagnose: (id: string) => void;
}

export function NeedCardStack({ needs, onClose, onQuickCheck, onDiagnose }: NeedCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentNeed = needs[currentIndex];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offsext: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    
    setDirection(newDirection);
    setIsAnimating(true);
    
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % needs.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + needs.length) % needs.length);
    }
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white"
        >
          <span className="text-sm">ESC</span>
        </button>

        {/* Navigation indicators */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="text-white/80">
            {currentIndex + 1} / {needs.length}
          </span>
        </div>

        {/* Card Container */}
        <div className="relative h-[600px] w-full">
          <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute w-full h-full"
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-white/10">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{currentNeed.emoji}</span>
                    <h3 className="text-2xl font-bold text-white">{currentNeed.name}</h3>
                  </div>

                  {/* Status */}
                  {currentNeed.quickStatus && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60">Current Status</span>
                        <span className={`font-medium ${
                          parseInt(currentNeed.quickStatus.value) === 100 
                            ? 'text-green-400' 
                            : 'text-amber-400'
                        }`}>
                          {currentNeed.quickStatus.value}% Met
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            parseInt(currentNeed.quickStatus.value) === 100
                              ? 'bg-green-400'
                              : 'bg-amber-400'
                          }`}
                          style={{ width: `${currentNeed.quickStatus.value}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Check-in Options */}
                  <div className="flex-grow overflow-y-auto scrollbar-hide">
                    <h4 className="text-lg font-medium text-white/80 mb-4">Check-in Options:</h4>
                    <div className="space-y-3">
                      {currentNeed.checkInOptions.map((option, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <span className="text-white/80">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => onQuickCheck(currentNeed.id)}
                      className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-xl transition-colors flex items-center justify-center gap-2 ring-1 ring-blue-500/50"
                    >
                      Quick Check
                    </button>
                    <button
                      onClick={() => onDiagnose(currentNeed.id)}
                      className="px-4 py-3 bg-violet-500/20 hover:bg-violet-500/30 text-white rounded-xl transition-colors flex items-center justify-center gap-2 ring-1 ring-violet-500/50"
                    >
                      Diagnose
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 text-white/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isAnimating}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 text-white/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isAnimating}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}