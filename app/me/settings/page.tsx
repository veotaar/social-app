'use client';

import { FC } from 'react';
import SettingsForm from '@/components/SettingsForm';
import { userStore } from '@/lib/state';
// import Link from 'next/link';

const SettingsPage: FC = () => {
  const isSignedIn = userStore((state) => state.isSignedIn);

  if (!isSignedIn) {
    return (
      <div className="mx-auto my-2 max-w-5xl rounded border p-2">
        <h2>Sign in to view this page</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto my-2 max-w-5xl rounded border p-2">
      <h2>You can change your username and bio here.</h2>
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
