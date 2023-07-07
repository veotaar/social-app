import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SubmitButton: FC = () => {
  return (
    <Button variant="outline" asChild>
      <Link href="/submit">Submit a new post</Link>
    </Button>
  );
};

export default SubmitButton;
