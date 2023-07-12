import {
  getCountFromServer,
  query,
  collection,
  where,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export const isUsernameAlreadyExists = async (username: string): Promise<Boolean> => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('displayName', '==', username));
  const snapshot = await getCountFromServer(q);
  return Boolean(snapshot.data().count);
};

export const addScoreToPost = async (postId: string, amountToAdd: number): Promise<void> => {
  const postRef = doc(db, 'posts', postId);

  await updateDoc(postRef, {
    score: increment(amountToAdd),
  });
};

export const addPostToUpvotes = async (uid: string, postId: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    upvotedPosts: arrayUnion(postId),
  });
};

export const removePostFromUpvotes = async (uid: string, postId: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    upvotedPosts: arrayRemove(postId),
  });
};

export const addPostToDownvotes = async (uid: string, postId: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    downvotedPosts: arrayUnion(postId),
  });
};

export const removePostFromDownvotes = async (uid: string, postId: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    downvotedPosts: arrayRemove(postId),
  });
};

export const moveFromUpvotesToDownvotes = async (uid: string, postId: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    upvotedPosts: arrayRemove(postId),
    downvotedPosts: arrayUnion(postId),
  });
};

export const moveFromDownvotesToUpvotes = async (uid: string, postId: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    upvotedPosts: arrayUnion(postId),
    downvotedPosts: arrayRemove(postId),
  });
};
