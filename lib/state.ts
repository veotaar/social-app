import { create } from 'zustand';

type UserState = {
  displayName: string | null;
  about: string;
  createdAt: Date;
  uid: string;
  isSignedIn: boolean;
};

type Action = {
  updateDisplayName: (displayName: UserState['displayName']) => void;
  updateAbout: (about: UserState['about']) => void;
  updateCreatedAt: (createdAt: UserState['createdAt']) => void;
  updateUid: (uid: UserState['uid']) => void;
  updateIsSignedIn: (isSignedIn: UserState['isSignedIn']) => void;
  resetUser: () => void;
};

export const userStore = create<UserState & Action>()((set) => ({
  displayName: '',
  about: '',
  createdAt: new Date(0),
  uid: '',
  isSignedIn: false,
  updateDisplayName: (displayName) => set({ displayName }),
  updateAbout: (about) => set({ about }),
  updateCreatedAt: (createdAt) => set({ createdAt }),
  updateUid: (uid) => set({ uid }),
  updateIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  resetUser: () =>
    set({
      displayName: '',
      about: '',
      createdAt: new Date(0),
      uid: '',
      isSignedIn: false,
    }),
}));
