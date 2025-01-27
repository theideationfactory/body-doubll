import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { DailyRecord } from '../types/records';

export const recordsService = {
  async saveDailyRecord(record: DailyRecord): Promise<string> {
    const docRef = await addDoc(collection(db, 'records'), {
      ...record,
      createdAt: new Date()
    });
    return docRef.id;
  },

  async getDailyRecords(): Promise<DailyRecord[]> {
    const q = query(
      collection(db, 'records'),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as DailyRecord));
  }
};