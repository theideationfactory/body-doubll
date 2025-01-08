import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAq30zaUrCf9EnAnB4wkC-hBr2yNXIc1UE",
  authDomain: "doubii-c282a.firebaseapp.com", 
  projectId: "doubii-c282a",
  storageBucket: "doubii-c282a.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "1033926245533",
  appId: "1:1033926245533:web:e137da29c070ddf4a0e874",
  measurementId: "G-LH58EZLH5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;