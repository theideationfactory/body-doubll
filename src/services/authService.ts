import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { SignUpCredentials } from '../types/auth';

const auth = getAuth();

export const authService = {
  async signUp({ email, password, username, accountType }: SignUpCredentials) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(user, {
      displayName: username
    });

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      username,
      accountType,
      createdAt: new Date()
    });

    return user;
  },

  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  async signOut() {
    await firebaseSignOut(auth);
  },

  async getUserProfile(userId: string) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.data();
  },

  getCurrentUser() {
    return auth.currentUser;
  }
};