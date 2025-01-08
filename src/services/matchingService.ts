import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface MatchingCriteria {
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

export const matchingService = {
  async saveMatchingCriteria(criteria: MatchingCriteria) {
    try {
      // Add timestamps
      const criteriaWithTimestamps = {
        ...criteria,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'matching_criteria'), criteriaWithTimestamps);
      return docRef.id;
    } catch (error) {
      console.error('Error saving matching criteria:', error);
      throw error;
    }
  },

  async findMatches(criteria: MatchingCriteria) {
    try {
      // Query for matches based on location and opposite type
      const q = query(
        collection(db, 'matching_criteria'),
        where('type', '==', criteria.type === 'client' ? 'doubll' : 'client'),
        where('location.city', '==', criteria.location.city),
        where('location.state', '==', criteria.location.state)
      );

      const querySnapshot = await getDocs(q);
      const matches = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter matches based on skills, qualities, and availability overlap
      return matches.filter(match => {
        // Check for skills overlap
        const skillsOverlap = criteria.skills.some(skill => 
          match.skills.includes(skill)
        );

        // Check for qualities overlap
        const qualitiesOverlap = criteria.qualities.some(quality => 
          match.qualities.includes(quality)
        );

        // Check for availability overlap
        const hasAvailabilityOverlap = Object.keys(criteria.availability).some(day => {
          const criteriaDay = criteria.availability[day];
          const matchDay = match.availability[day];
          return (
            (criteriaDay.morning && matchDay.morning) ||
            (criteriaDay.afternoon && matchDay.afternoon) ||
            (criteriaDay.evening && matchDay.evening)
          );
        });

        return skillsOverlap && qualitiesOverlap && hasAvailabilityOverlap;
      });
    } catch (error) {
      console.error('Error finding matches:', error);
      throw error;
    }
  }
};