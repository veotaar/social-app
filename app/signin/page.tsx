import SignInForm from '@/components/SingInForm';
import { FC } from 'react';

// interface pageProps {

// }

const page: FC = () => {
  return (
    <div className="h-full w-full">
      <h1 className="my-6 text-center text-2xl font-extrabold">Sign in</h1>
      <SignInForm />
    </div>
  );
};

export default page;
