import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Need } from '../types/needs';

export const needsService = {
  async saveNeedCheck(need: Need, selectedNeeds: string[]): Promise<string> {
    const docRef = await addDoc(collection(db, 'needChecks'), {
      needId: need.id,
      name: need.name,
      selectedNeeds,
      timestamp: new Date()
    });
    return docRef.id;
  },

  async getNeedChecks(): Promise<any[]> {
    const q = query(
      collection(db, 'needChecks'),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};