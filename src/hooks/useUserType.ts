import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AccountType } from '../types/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useUserType() {
  const { user } = useAuth();
  const [userType, setUserType] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      if (!user) {
        setUserType(null);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserType(userDoc.data().accountType as AccountType);
        }
      } catch (error) {
        console.error('Error fetching user type:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserType();
  }, [user]);

  return { userType, loading };
}
