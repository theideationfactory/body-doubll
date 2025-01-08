export interface TimerStats {
  id: string;
  timerId: string;
  startTime: number;
  endTime?: number;
  duration: number;
  completed: boolean;
  pauses: number;
  totalPauseDuration: number;
}

export interface Timer {
  id: string;
  name: string;
  duration: number;
  minimized: boolean;
  category?: string;
  groupId?: string;
  color?: string;
  repeat?: boolean;
  repeatCount?: number;
  pauseOnComplete?: boolean;
  presetId?: string;
  currentStats?: TimerStats;
}