import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase Configuration
 */
const firebaseConfig = {
  apiKey: "AIzaSyBp12VFsUX8ifQ232UiliCLajlKvkLbQxo",
  authDomain: "sizzle-16261.firebaseapp.com",
  projectId: "sizzle-16261",
  storageBucket: "sizzle-16261.firebasestorage.app",
  messagingSenderId: "311496339366",
  appId: "1:311496339366:web:421f6b316289cd2519e967"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;