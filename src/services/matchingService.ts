import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp, 
  getDoc, 
  doc, 
  DocumentData,
  DocumentSnapshot,
  updateDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface MatchingCriteria {
  id?: string;
  userId: string;
  type: 'client' | 'doubll';
  location: {
    city: string;
    state: string;
  };
  skills: string[];
  qualities: string[];
  availability: {
    [key: string]: {
      morning: boolean;
      afternoon: boolean;
      evening: boolean;
    };
  };
  createdAt?: any;
  updatedAt?: any;
}

interface UserData {
  username?: string;
  [key: string]: any;
}

export const matchingService = {
  async saveMatchingCriteria(criteria: MatchingCriteria) {
    try {
      // Add timestamps
      const criteriaWithTimestamps = {
        ...criteria,
        updatedAt: serverTimestamp()
      };

      // Query for existing profile
      const q = query(
        collection(db, 'matching_criteria'),
        where('userId', '==', criteria.userId),
        where('type', '==', criteria.type)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Update existing profile
        const existingDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'matching_criteria', existingDoc.id), criteriaWithTimestamps);
        return existingDoc.id;
      } else {
        // Create new profile
        criteriaWithTimestamps.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, 'matching_criteria'), criteriaWithTimestamps);
        return docRef.id;
      }
    } catch (error) {
      console.error('Error saving matching criteria:', error);
      throw error;
    }
  },

  async getUserProfile(userId: string): Promise<MatchingCriteria | null> {
    try {
      const q = query(
        collection(db, 'matching_criteria'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      // Validate that all required fields are present
      if (!data.userId || !data.type || !data.location || !data.skills || 
          !data.qualities || !data.availability) {
        console.error('Missing required fields in matching criteria');
        return null;
      }

      return {
        id: doc.id,
        userId: data.userId,
        type: data.type,
        location: data.location,
        skills: data.skills,
        qualities: data.qualities,
        availability: data.availability,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  async findMatches(criteria: MatchingCriteria) {
    try {
      // Query for matches based on opposite type
      const q = query(
        collection(db, 'matching_criteria'),
        where('type', '==', criteria.type === 'client' ? 'doubll' : 'client')
      );

      const querySnapshot = await getDocs(q);
      
      // Fetch user data for each match to get username
      const matchPromises = querySnapshot.docs.map(async (matchDoc) => {
        const matchData: DocumentData = { id: matchDoc.id, ...matchDoc.data() };
        
        // Fetch user document to get username
        const userDocRef = doc(db, 'users', matchData.userId);
        const userDoc: DocumentSnapshot<DocumentData> = await getDoc(userDocRef);
        const userData: UserData | null = userDoc.exists() ? userDoc.data() : null;

        return {
          ...matchData,
          username: userData?.username || 'Unknown User',
          userEmail: userData?.email || 'No email'  
        };
      });

      const allMatches = await Promise.all(matchPromises);

      // Scoring function for matches
      const scoreMatch = (match: any) => {
        let score = 0;

        // Priority 1: Location (highest weight)
        if (match.location.city === criteria.location.city && 
            match.location.state === criteria.location.state) {
          score += 1000; // Significant boost for exact location match
        }

        // Priority 2: Availability
        const availabilityOverlap = Object.keys(criteria.availability).reduce((total, day) => {
          const criteriaDay = criteria.availability[day];
          const matchDay = match.availability[day];
          const dayScore = (
            (criteriaDay.morning && matchDay.morning ? 1 : 0) +
            (criteriaDay.afternoon && matchDay.afternoon ? 1 : 0) +
            (criteriaDay.evening && matchDay.evening ? 1 : 0)
          );
          return total + dayScore;
        }, 0);
        score += availabilityOverlap * 100; // Weight availability matches

        // Priority 3: Skills
        const skillsOverlap = criteria.skills.filter(skill => 
          match.skills.includes(skill)
        ).length;
        score += skillsOverlap * 50; // Weight skills matches

        // Priority 4: Qualities
        const qualitiesOverlap = criteria.qualities.filter(quality => 
          match.qualities.includes(quality)
        ).length;
        score += qualitiesOverlap * 25; // Lowest weight for qualities

        return { ...match, matchScore: score };
      };

      // Score and sort matches
      const scoredMatches = allMatches
        .map(scoreMatch)
        .sort((a, b) => b.matchScore - a.matchScore);

      // Return top 5 matches
      return scoredMatches.slice(0, 5);
    } catch (error) {
      console.error('Error finding matches:', error);
      throw error;
    }
  }
};