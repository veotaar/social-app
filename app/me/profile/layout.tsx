import { FC, Suspense } from 'react';
import ProfileLoading from './loading';
import ProfilePage from './page';

const ProfileLayout: FC = () => {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfilePage />
    </Suspense>
  );
};

export default ProfileLayout;
