import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { BagItem } from '../types/bag';

export const bagService = {
  async saveBagCheck(bagId: string, items: BagItem[]): Promise<string> {
    const docRef = await addDoc(collection(db, 'bagChecks'), {
      bagId,
      items,
      timestamp: new Date()
    });
    return docRef.id;
  },

  async getBagChecks(): Promise<any[]> {
    const q = query(
      collection(db, 'bagChecks'),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};