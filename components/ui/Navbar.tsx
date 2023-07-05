'use client';

import Link from 'next/link';
import { FC, useEffect } from 'react';
import { userStore } from '@/lib/state';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { ModeToggle } from './ModeToggle';
import UserNav from '../UserNav';
// import { doc, getDoc } from 'firebase/firestore';

const Navbar: FC = () => {
  const isSignedIn = userStore((state) => state.isSignedIn);
  const displayName = userStore((state) => state.displayName);
  const uid = userStore((state) => state.uid);

  const updateDisplayName = userStore((state) => state.updateDisplayName);
  const updateUid = userStore((state) => state.updateUid);
  const updateCreatedAt = userStore((state) => state.updateCreatedAt);
  const updateIsSignedIn = userStore((state) => state.updateIsSignedIn);
  const updateAbout = userStore((state) => state.updateAbout);
  const resetUser = userStore((state) => state.resetUser);

  useEffect(() => {
    const getAbout = async () => {
      if (!isSignedIn || !uid) return;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        updateAbout(docSnap.data().about);
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    };

    getAbout();
  }, [isSignedIn, uid]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateDisplayName(user.displayName);
      updateCreatedAt(new Date(user.metadata.creationTime as string));
      updateUid(user.uid);
      updateIsSignedIn(true);
    } else {
      resetUser();
      console.log('signed out');
    }
  });

  return (
    <div className=" border-b px-3 py-2">
      <nav className="mx-auto flex max-w-5xl items-center gap-2">
        <Link href="/" className="text-xl font-bold">
          Odin News
        </Link>

        {isSignedIn ? (
          <div className="ml-auto">
            <UserNav username={displayName} />
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-2">
            <Link href="/signin" className="font-bold hover:text-neutral-700 dark:hover:text-neutral-300">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-emerald-700 p-2 font-bold text-neutral-50 hover:bg-emerald-600"
            >
              Sign up
            </Link>
          </div>
        )}

        <ModeToggle />
      </nav>
    </div>
  );
};

export default Navbar;
