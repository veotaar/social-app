import SignUpForm from '@/components/SignUpForm';
import { FC } from 'react';

const page: FC = () => {
  return (
    <div className="h-full w-full">
      <h1 className="my-6 text-center text-2xl font-extrabold">Create your account!</h1>
      <SignUpForm />
    </div>
  );
};

export default page;
