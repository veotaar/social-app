import { FC } from 'react';
import SubmitButton from '@/components/SubmitButton';
import Feed from '@/components/Feed';

const Home: FC = () => {
  return (
    <div className="mx-auto max-w-5xl py-2">
      <SubmitButton />
      <Feed />
    </div>
  );
};

export default Home;
