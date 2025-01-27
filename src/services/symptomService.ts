import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const symptomService = {
  async saveSymptomLog(symptom: { name: string; severity: number; notes?: string }): Promise<string> {
    const docRef = await addDoc(collection(db, 'symptoms'), {
      ...symptom,
      timestamp: new Date()
    });
    return docRef.id;
  },

  async getSymptomLogs(): Promise<any[]> {
    const q = query(
      collection(db, 'symptoms'),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
};