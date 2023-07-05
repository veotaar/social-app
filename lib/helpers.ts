import { getCountFromServer, query, collection, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const isUsernameAlreadyExists = async (username: string): Promise<Boolean> => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('displayName', '==', username));
  const snapshot = await getCountFromServer(q);
  return Boolean(snapshot.data().count);
};
