import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAiiXwt0b1FKkfLMVEJG5Wd-mSXPQmnXpU',
  authDomain: 'undangan-dicky-lis-fe63a.firebaseapp.com',
  projectId: 'undangan-dicky-lis-fe63a',
  storageBucket: 'undangan-dicky-lis-fe63a.firebasestorage.app',
  messagingSenderId: '182512964850',
  appId: '1:182512964850:web:fb9d872c75c98cabc5ac6b',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
