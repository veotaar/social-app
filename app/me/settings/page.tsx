import { FC } from 'react';
import SettingsForm from '@/components/SettingsForm';

const SettingsPage: FC = () => {
  return (
    <div className="mx-auto my-2 max-w-5xl rounded border p-2">
      <h2>You can change your username and bio here.</h2>
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
