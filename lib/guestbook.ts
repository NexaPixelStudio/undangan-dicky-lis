import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type GuestbookFormData = {
  name: string;
  attendance: string;
  guestCount: number;
  message: string;
};

export type GuestbookItem = {
  id: string;
  name: string;
  attendance: string;
  guestCount: number;
  message: string;
  createdAt: Date | null;
};

const COLLECTION_NAME = 'wedding_guestbook';

export async function submitGuestbook(data: GuestbookFormData) {
  const payload = {
    name: data.name.trim().slice(0, 80),
    attendance: data.attendance,
    guestCount: Math.max(1, Math.min(10, Number(data.guestCount) || 1)),
    message: data.message.trim().slice(0, 500),
    createdAt: serverTimestamp(),
  };

  if (!payload.name) {
    throw new Error('Nama tamu wajib diisi.');
  }

  return addDoc(collection(db, COLLECTION_NAME), payload);
}

export function subscribeGuestbook(
  callback: (items: GuestbookItem[]) => void,
  onError?: (error: Error) => void
) {
  const guestbookQuery = query(
    collection(db, COLLECTION_NAME),
    orderBy('createdAt', 'desc'),
    limit(100)
  );

  return onSnapshot(
    guestbookQuery,
    (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name || '',
          attendance: data.attendance || '',
          guestCount: data.guestCount || 1,
          message: data.message || '',
          createdAt: data.createdAt?.toDate?.() || null,
        };
      });

      callback(items);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}
