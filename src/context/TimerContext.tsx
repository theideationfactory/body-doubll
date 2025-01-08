import React, { createContext, useContext, useState, useEffect } from 'react';
import { Timer, TimerGroup } from '../types/timer';

interface TimerContextType {
  timers: Timer[];
  groups: TimerGroup[];
  addTimer: (timer: Timer) => void;
  addTimers: (newTimers: Timer[]) => void;
  removeTimer: (id: string) => void;
  toggleMinimize: (id: string) => void;
  addGroup: (group: TimerGroup) => void;
  removeGroup: (id: string) => void;
  startGroup: (id: string) => void;
  pauseGroup: (id: string) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [groups, setGroups] = useState<TimerGroup[]>([]);

  const addTimer = (timer: Timer) => {
    setTimers(prev => [...prev, timer]);
  };

  const addTimers = (newTimers: Timer[]) => {
    setTimers(prev => [...prev, ...newTimers]);
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const toggleMinimize = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, minimized: !timer.minimized } : timer
    ));
  };

  const addGroup = (group: TimerGroup) => {
    setGroups(prev => [...prev, group]);
  };

  const removeGroup = (id: string) => {
    setGroups(prev => prev.filter(group => group.id !== id));
  };

  const startGroup = (id: string) => {
    setGroups(prev => prev.map(group =>
      group.id === id ? { ...group, active: true } : group
    ));
  };

  const pauseGroup = (id: string) => {
    setGroups(prev => prev.map(group =>
      group.id === id ? { ...group, active: false } : group
    ));
  };

  return (
    <TimerContext.Provider value={{ 
      timers, 
      groups, 
      addTimer, 
      addTimers, 
      removeTimer, 
      toggleMinimize,
      addGroup,
      removeGroup,
      startGroup,
      pauseGroup
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimers() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimers must be used within a TimerProvider');
  }
  return context;
}