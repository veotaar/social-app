import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface UserNavProps {
  username: string | null;
}

const UserNav: FC<UserNavProps> = ({ username }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{`user / ${username}` || 'no user'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/me/profile">Go to profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/me/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut(auth);
            router.push('/');
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
