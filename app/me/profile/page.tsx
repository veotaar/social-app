'use client';

import { FC } from 'react';
import { userStore } from '@/lib/state';
import format from 'date-fns/format';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProfilePage: FC = () => {
  const displayName = userStore((state) => state.displayName);
  const createdAt = userStore((state) => state.createdAt);
  const isSignedIn = userStore((state) => state.isSignedIn);
  const about = userStore((state) => state.about);

  return (
    <div>
      <div className="relative mx-auto my-2 max-w-5xl rounded border p-2">
        <p>user: {isSignedIn ? displayName : 'loading...'}</p>
        <p>joined: {isSignedIn ? format(new Date(createdAt), 'dd.MM.y') : 'loading...'}</p>
        <p>about: {isSignedIn ? about : 'loading...'}</p>
        <Link href="/me/settings">
          <Button variant="outline" size="icon" className="absolute right-2 top-2">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Go to profile settings</span>
          </Button>
        </Link>
      </div>

      <div className="mx-auto my-2 max-w-5xl rounded border p-2">
        <p>Comments and posts will appear here</p>
      </div>
    </div>
  );
};

export default ProfilePage;
