import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { QuizResponse } from '../types/quiz';

export const quizService = {
  async saveQuizResponse(response: QuizResponse): Promise<string> {
    const docRef = await addDoc(collection(db, 'quizResponses'), {
      ...response,
      timestamp: new Date()
    });
    return docRef.id;
  }
};