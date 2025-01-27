import React, { useState, useEffect } from 'react';
import { useTimers } from '../../context/TimerContext';
import { Timer } from '../../types/timer';
import { formatTime } from '../../utils/timeUtils';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Howl } from 'howler';

export function PersistentTimer() {
  const { timers } = useTimers();
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const initialTimeLeft = timers.reduce((acc, timer) => {
      acc[timer.id] = timer.duration;
      return acc;
    }, {} as Record<string, number>);
    setTimeLeft(initialTimeLeft);
  }, [timers]);

  useEffect(() => {
    const sound = new Howl({
      src: ['/sounds/timer-complete.mp3'],
      loop: true,
      volume: 1.0,
    });

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(id => {
          if (updated[id] <= 0) return;
          updated[id] = Math.max(0, updated[id] - 1000);
          if (updated[id] === 0) sound.play();
        });
        return updated;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      sound.stop();
    };
  }, []);

  const getUrgentTimer = (): Timer | null => {
    let urgentTimer: Timer | null = null;
    let minTimeLeft = Infinity;

    timers.forEach(timer => {
      const remaining = timeLeft[timer.id] || 0;
      if (remaining > 0 && remaining < minTimeLeft) {
        minTimeLeft = remaining;
        urgentTimer = timer;
      }
    });

    return urgentTimer;
  };

  const getGradientColors = (timeInMs: number) => {
    const timeInSeconds = timeInMs / 1000;
    if (timeInSeconds > 1200) return 'from-emerald-400 to-green-500';
    if (timeInSeconds > 600) return 'from-yellow-400 to-amber-500';
    if (timeInSeconds > 300) return 'from-orange-400 to-amber-500';
    return 'from-red-400 to-rose-500';
  };

  const getShadowColor = (timeInMs: number) => {
    const timeInSeconds = timeInMs / 1000;
    if (timeInSeconds > 1200) return 'shadow-green-500/50';
    if (timeInSeconds > 600) return 'shadow-amber-500/50';
    if (timeInSeconds > 300) return 'shadow-orange-500/50';
    return 'shadow-red-500/50';
  };

  const urgentTimer = getUrgentTimer();
  if (!urgentTimer) return null;

  const currentTimeLeft = timeLeft[urgentTimer.id] || 0;
  const progress = (currentTimeLeft / urgentTimer.duration) * 100;

  return (
    <div className="fixed top-[72px] left-0 right-0 z-40 animate-fadeIn px-4">
      <div className="max-w-2xl mx-auto">
        <div className={`relative rounded-lg transition-all duration-300 ${isExpanded ? 'p-4' : 'p-2'} bg-gradient-to-br ${getGradientColors(currentTimeLeft)} shadow-lg ${getShadowColor(currentTimeLeft)}`}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isExpanded ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">
                  {urgentTimer.name || 'Timer'}
                </h3>
                <span className="text-2xl font-bold text-white">
                  {formatTime(currentTimeLeft)}
                </span>
              </div>

              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300 bg-white/30"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-white">
                {urgentTimer.name || 'Timer'}
              </span>
              <span className="text-sm font-medium text-white">
                {formatTime(currentTimeLeft)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}