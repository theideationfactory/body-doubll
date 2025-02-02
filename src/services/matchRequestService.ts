import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  deleteDoc,
  getDoc
} from 'firebase/firestore';

export type MatchRequest = {
  id?: string;
  senderId: string;
  senderName: string;
  senderType: 'client' | 'doubll';
  recipientId: string;
  recipientName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Timestamp;
  location: {
    city: string;
    state: string;
  };
  skills: string[];
  qualities: string[];
};

export const matchRequestService = {
  async sendMatchRequest(request: Omit<MatchRequest, 'id' | 'status' | 'createdAt'>) {
    try {
      // Check if a request already exists between these users
      const existingRequest = await this.getExistingRequest(request.senderId, request.recipientId);
      
      if (existingRequest) {
        throw new Error('A match request already exists between these users');
      }

      const matchRequestData: Omit<MatchRequest, 'id'> = {
        ...request,
        status: 'pending',
        createdAt: Timestamp.now()
      };

      console.log('Creating match request with data:', matchRequestData);
      const docRef = await addDoc(collection(db, 'match_requests'), matchRequestData);
      console.log('Match request created with ID:', docRef.id);

      // Verify the document was created correctly
      const createdDoc = await doc(db, 'match_requests', docRef.id);
      const docSnap = await getDocs(query(
        collection(db, 'match_requests'),
        where('recipientId', '==', request.recipientId),
        where('status', '==', 'pending')
      ));
      console.log('Verifying created request - found docs:', docSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      return { id: docRef.id, ...matchRequestData };
    } catch (error) {
      console.error('Error sending match request:', error);
      throw error;
    }
  },

  async getExistingRequest(senderId: string, recipientId: string) {
    const q = query(
      collection(db, 'match_requests'),
      where('senderId', 'in', [senderId, recipientId]),
      where('recipientId', 'in', [senderId, recipientId])
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    } as MatchRequest;
  },

  async getPendingRequests(userId: string) {
    console.log('Getting pending requests for user:', userId);
    
    // First, let's check if the user exists in any requests
    const allRequestsQ = query(
      collection(db, 'match_requests'),
      where('recipientId', '==', userId)
    );
    
    const allRequests = await getDocs(allRequestsQ);
    console.log('All requests for user:', allRequests.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    // Now get only pending requests
    const pendingQ = query(
      collection(db, 'match_requests'),
      where('recipientId', '==', userId),
      where('status', '==', 'pending')
    );

    const querySnapshot = await getDocs(pendingQ);
    const pendingRequests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MatchRequest[];
    
    console.log('Found pending requests:', pendingRequests);
    return pendingRequests;
  },

  async getSentRequests(userId: string) {
    console.log('Getting sent requests for user:', userId);
    const q = query(
      collection(db, 'match_requests'),
      where('senderId', '==', userId),
      where('status', '==', 'pending')
    );

    const querySnapshot = await getDocs(q);
    console.log('Found sent requests:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MatchRequest[];
  },

  async getRequestById(requestId: string) {
    try {
      const docRef = doc(db, 'match_requests', requestId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Match request not found');
      }

      return {
        id: docSnap.id,
        ...docSnap.data()
      } as MatchRequest;
    } catch (error) {
      console.error('Error getting request by ID:', error);
      throw error;
    }
  },

  async updateRequestStatus(requestId: string, status: 'accepted' | 'rejected') {
    try {
      const requestRef = doc(db, 'match_requests', requestId);
      await updateDoc(requestRef, { status });
    } catch (error) {
      console.error('Error updating match request:', error);
      throw error;
    }
  },

  async deleteRequest(requestId: string) {
    try {
      await deleteDoc(doc(db, 'match_requests', requestId));
    } catch (error) {
      console.error('Error deleting match request:', error);
      throw error;
    }
  }
};
