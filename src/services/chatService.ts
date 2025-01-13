import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  serverTimestamp,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Message {
  id?: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  createdAt: Timestamp;
  matchId: string;
}

export const chatService = {
  async sendMessage(message: Omit<Message, 'id' | 'createdAt'>) {
    try {
      const messageData = {
        ...message,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'messages'), messageData);
      return { id: docRef.id, ...messageData };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  getMessages(matchId: string, callback: (messages: Message[]) => void) {
    const q = query(
      collection(db, 'messages'),
      where('matchId', '==', matchId),
      orderBy('createdAt', 'asc')
    );

    // Set up real-time listener
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      callback(messages);
    });
  },

  async getMatchedUsers(userId: string) {
    const q = query(
      collection(db, 'match_requests'),
      where('status', '==', 'accepted'),
      where('senderId', '==', userId)
    );

    const q2 = query(
      collection(db, 'match_requests'),
      where('status', '==', 'accepted'),
      where('recipientId', '==', userId)
    );

    const [sentMatches, receivedMatches] = await Promise.all([
      getDocs(q),
      getDocs(q2)
    ]);

    return [
      ...sentMatches.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      ...receivedMatches.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    ];
  }
};
