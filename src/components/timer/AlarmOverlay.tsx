import React, { useEffect } from 'react';
import { Timer } from '../../types/timer';
import { formatTime } from '../../utils/timeUtils';
import { Howl } from 'howler';

interface AlarmOverlayProps {
  timer: Timer;
  onDismiss: () => void;
}

export function AlarmOverlay({ timer, onDismiss }: AlarmOverlayProps) {
  useEffect(() => {
    const sound = new Howl({
      src: ['/Assets/finalalarmsound.mp3'],
      loop: true,
      volume: 1.0,
      autoplay: true,
    });

    return () => {
      sound.stop();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
      <div className="max-w-2xl w-full mx-4 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-bold text-white animate-pulse">
            Time's Up!
          </h2>
          <p className="text-2xl md:text-3xl text-white/90">
            {timer.name || 'Timer Complete'}
          </p>
          <div className="text-4xl md:text-6xl font-mono text-white/80">
            {formatTime(0)}
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="w-full max-w-lg mx-auto px-8 py-6 text-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          I'll Go!
        </button>
      </div>
    </div>
  );
}