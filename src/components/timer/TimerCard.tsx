import React, { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, Play, Pause, Minimize } from 'lucide-react';
import { Timer } from '../../types/timer';
import { formatTime } from '../../utils/timeUtils';
import { AlarmOverlay } from './AlarmOverlay';
import { Howl } from 'howler';

interface TimerCardProps {
  timer: Timer;
  onDelete: (id: string) => void;
  onToggleMinimize: (id: string) => void;
}

export function TimerCard({ timer, onDelete, onToggleMinimize }: TimerCardProps) {
  const [timeLeft, setTimeLeft] = useState(timer.duration);
  const [isAlarming, setIsAlarming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const sound = new Howl({
      src: ['/Assets/finalalarmsound.mp3'],
      loop: true,
      volume: 1.0,
    });

    if (timeLeft <= 0) {
      setIsAlarming(true);
      sound.play();
      return () => sound.stop();
    }

    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1000));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      sound.stop();
    };
  }, [timeLeft, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const getGradientColors = () => {
    const timeInSeconds = timeLeft / 1000;
    if (isAlarming) return isFullscreen 
      ? 'from-rose-600 via-red-600 to-rose-600'
      : 'from-red-500/80 to-rose-500/80';
    
    if (timeInSeconds > 1200) return isFullscreen
      ? 'from-emerald-500 via-green-500 to-teal-500'
      : 'from-emerald-400 to-green-500';
    
    if (timeInSeconds > 600) return isFullscreen
      ? 'from-amber-500 via-yellow-500 to-orange-500'
      : 'from-yellow-400 to-amber-500';
    
    if (timeInSeconds > 300) return isFullscreen
      ? 'from-orange-500 via-amber-500 to-red-500'
      : 'from-orange-400 to-amber-500';
    
    return isFullscreen
      ? 'from-red-600 via-rose-600 to-pink-600'
      : 'from-red-400 to-rose-500';
  };

  const getShadowColor = () => {
    const timeInSeconds = timeLeft / 1000;
    if (isAlarming) return 'shadow-red-500/50';
    if (timeInSeconds > 1200) return 'shadow-green-500/50';
    if (timeInSeconds > 600) return 'shadow-amber-500/50';
    if (timeInSeconds > 300) return 'shadow-orange-500/50';
    return 'shadow-red-500/50';
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} opacity-75 animate-gradient`} />
        
        {/* Animated subtle waves */}
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            animation: 'wave 8s linear infinite'
          }}
        />

        {/* Glowing orbs in the background */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Controls overlay at the top */}
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center bg-gradient-to-b from-black/70 via-black/30 to-transparent">
          <h3 className="text-3xl font-bold text-white truncate pr-4">
            {timer.name || 'Timer'}
          </h3>
          <div className="flex items-center gap-6">
            <button
              onClick={togglePause}
              className="p-4 text-white hover:text-white/80 transition-colors rounded-xl hover:bg-white/10 backdrop-blur-sm"
            >
              {isPaused ? <Play size={32} /> : <Pause size={32} />}
            </button>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-4 text-white hover:text-white/80 transition-colors rounded-xl hover:bg-white/10 backdrop-blur-sm"
            >
              <Minimize size={32} />
            </button>
            <button
              onClick={() => onDelete(timer.id)}
              className="p-4 text-white hover:text-white/80 transition-colors rounded-xl hover:bg-white/10 backdrop-blur-sm"
            >
              <X size={32} />
            </button>
          </div>
        </div>

        {/* Main timer display */}
        <div className="relative text-center space-y-16 p-8 max-w-4xl w-full">
          <div className="relative">
            {/* Glowing effect behind the time */}
            <div className="absolute inset-0 blur-3xl opacity-75 bg-white/30 rounded-full transform scale-150" />
            
            <div className="relative text-[14rem] font-black text-white tabular-nums leading-none tracking-tight">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="w-full h-6 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full rounded-full transition-all duration-300 bg-white/50"
              style={{ width: `${(timeLeft / timer.duration) * 100}%` }}
            />
          </div>

          {/* Keyboard shortcuts help */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-12 text-white/70">
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm font-medium">Space</kbd>
              <span className="text-lg">Play/Pause</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm font-medium">Esc</kbd>
              <span className="text-lg">Exit Fullscreen</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (timer.minimized) {
    return (
      <>
        <div className={`rounded-lg shadow-md p-4 flex items-center justify-between bg-gradient-to-br ${getGradientColors()} ${getShadowColor()} transition-all duration-300`}>
          <span className="font-medium text-white">{timer.name || 'Timer'}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={togglePause}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <span className="text-sm text-white/90">{formatTime(timeLeft)}</span>
            <button
              onClick={() => onToggleMinimize(timer.id)}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
        {isAlarming && (
          <AlarmOverlay
            timer={timer}
            onDismiss={() => {
              setIsAlarming(false);
              onDelete(timer.id);
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div 
        className={`rounded-lg shadow-xl p-6 bg-gradient-to-br ${getGradientColors()} ${getShadowColor()} transition-all duration-300 ${
          isAlarming ? 'animate-pulse' : ''
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-white">
            {timer.name || 'Timer'}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={togglePause}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={() => onToggleMinimize(timer.id)}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              <Minimize2 size={16} />
            </button>
            <button
              onClick={() => onDelete(timer.id)}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="text-3xl font-bold text-white mb-4 text-center">
          {formatTime(timeLeft)}
        </div>

        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-white/30"
            style={{ width: `${(timeLeft / timer.duration) * 100}%` }}
          />
        </div>
      </div>

      {isAlarming && (
        <AlarmOverlay
          timer={timer}
          onDismiss={() => {
            setIsAlarming(false);
            onDelete(timer.id);
          }}
        />
      )}
    </>
  );
}