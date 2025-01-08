import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Timer, TimerStats } from '../types/timer';

export const timerService = {
  async saveTimer(timer: Timer): Promise<string> {
    const docRef = await addDoc(collection(db, 'timers'), {
      ...timer,
      createdAt: new Date()
    });
    return docRef.id;
  },

  async saveTimerStats(stats: TimerStats): Promise<string> {
    const docRef = await addDoc(collection(db, 'timerStats'), {
      ...stats,
      timestamp: new Date()
    });
    return docRef.id;
  },

  async getTimerStats(): Promise<TimerStats[]> {
    const q = query(
      collection(db, 'timerStats'),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as TimerStats);
  }
};