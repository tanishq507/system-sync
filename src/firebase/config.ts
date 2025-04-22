import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANYcJp-STKIhewsk0gZnVdAV-KmYNYBZ0",
  authDomain: "system-sync-e929c.firebaseapp.com",
  projectId: "system-sync-e929c",
  storageBucket: "system-sync-e929c.firebasestorage.app",
  messagingSenderId: "1082287774151",
  appId: "1:1082287774151:web:4f7bf4d1832cfbec6f21e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;