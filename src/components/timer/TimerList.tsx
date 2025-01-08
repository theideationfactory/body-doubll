import React from 'react';
import { Timer as TimerType } from '../../types/timer';
import { TimerCard } from './TimerCard';

interface TimerListProps {
  timers: TimerType[];
  onDelete: (id: string) => void;
  onToggleMinimize: (id: string) => void;
}

export function TimerList({ timers, onDelete, onToggleMinimize }: TimerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {timers.map(timer => (
        <TimerCard
          key={timer.id}
          timer={timer}
          onDelete={onDelete}
          onToggleMinimize={onToggleMinimize}
        />
      ))}
      {timers.length === 0 && (
        <div className="col-span-full text-center py-12 text-white/60">
          No timers yet. Add a timer to get started!
        </div>
      )}
    </div>
  );
}