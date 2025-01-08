import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { CompleteMoodEntry } from '../types/mood';

export const moodService = {
  async saveMoodEntry(entry: CompleteMoodEntry): Promise<string> {
    const docRef = await addDoc(collection(db, 'moods'), {
      ...entry,
      createdAt: new Date()
    });
    return docRef.id;
  },

  async getMoodEntries(): Promise<CompleteMoodEntry[]> {
    const q = query(
      collection(db, 'moods'),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CompleteMoodEntry));
  }
};