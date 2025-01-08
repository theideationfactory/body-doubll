import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Skills, CustomSkill } from '../types/skills';

export const skillsService = {
  async saveSkills(userId: string, skills: Skills): Promise<void> {
    await addDoc(collection(db, 'skills'), {
      userId,
      ...skills,
      updatedAt: new Date()
    });
  },

  async saveCustomSkill(userId: string, skill: CustomSkill): Promise<string> {
    const docRef = await addDoc(collection(db, 'customSkills'), {
      userId,
      ...skill,
      createdAt: new Date()
    });
    return docRef.id;
  },

  async getSkills(userId: string): Promise<Skills | null> {
    const q = query(
      collection(db, 'skills'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    return snapshot.docs[0].data() as Skills;
  },

  async getCustomSkills(userId: string): Promise<CustomSkill[]> {
    const q = query(
      collection(db, 'customSkills'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as CustomSkill));
  }
};