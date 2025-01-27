import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, Plus, Minus } from 'lucide-react';
import { Timer } from '../../types/timer';

interface TimerControlsProps {
  timer: Timer;
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSkip: () => void;
  onReset: () => void;
  onAdjustTime: (seconds: number) => void;
}

export function TimerControls({
  timer,
  isRunning,
  onPlay,
  onPause,
  onSkip,
  onReset,
  onAdjustTime
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onAdjustTime(-60)}
          className="p-2 text-white/80 hover:text-white transition-colors"
        >
          <Minus size={20} />
        </button>
        
        <button
          onClick={isRunning ? onPause : onPlay}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          {isRunning ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>
        
        <button
          onClick={() => onAdjustTime(60)}
          className="p-2 text-white/80 hover:text-white transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSkip}
          className="p-2 text-white/80 hover:text-white transition-colors"
        >
          <SkipForward size={20} />
        </button>
        
        <button
          onClick={onReset}
          className="p-2 text-white/80 hover:text-white transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}