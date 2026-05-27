import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'ISI_DARI_FIREBASE',
  authDomain: 'ISI_DARI_FIREBASE',
  projectId: 'ISI_DARI_FIREBASE',
  storageBucket: 'ISI_DARI_FIREBASE',
  messagingSenderId: 'ISI_DARI_FIREBASE',
  appId: 'ISI_DARI_FIREBASE',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
