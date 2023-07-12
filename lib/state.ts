import { create } from 'zustand';

type UserState = {
  displayName: string | null;
  about: string;
  createdAt: Date;
  uid: string;
  isSignedIn: boolean;
  upvotedPosts: string[];
  downvotedPosts: string[];
  upvotedComments: string[];
  downvotedComments: string[];
};

type Action = {
  updateDisplayName: (displayName: UserState['displayName']) => void;
  updateAbout: (about: UserState['about']) => void;
  updateCreatedAt: (createdAt: UserState['createdAt']) => void;
  updateUid: (uid: UserState['uid']) => void;
  updateIsSignedIn: (isSignedIn: UserState['isSignedIn']) => void;
  resetUser: () => void;
  addToUpvotedPosts: (postId: string) => void;
  addToDownvotedPosts: (postId: string) => void;
  addToUpvotedComments: (commentId: string) => void;
  addToDownvotedComments: (commentId: string) => void;
  removeFromUpvotedPosts: (postId: string) => void;
  removeFromDownvotedPosts: (postId: string) => void;
  removeFromUpvotedComments: (commentId: string) => void;
  removeFromDownvotedComments: (commentId: string) => void;
  loadUpvotedPosts: (postsArr: string[]) => void;
  loadDownvotedPosts: (postsArr: string[]) => void;
  loadUpvotedComments: (commentsArr: string[]) => void;
  loadDownvotedComments: (commentsArr: string[]) => void;
};

export const userStore = create<UserState & Action>()((set) => ({
  displayName: '',
  about: '',
  createdAt: new Date(0),
  uid: '',
  isSignedIn: false,
  upvotedPosts: [],
  downvotedPosts: [],
  upvotedComments: [],
  downvotedComments: [],
  updateDisplayName: (displayName) => set({ displayName }),
  updateAbout: (about) => set({ about }),
  updateCreatedAt: (createdAt) => set({ createdAt }),
  updateUid: (uid) => set({ uid }),
  updateIsSignedIn: (isSignedIn) => set({ isSignedIn }),
  addToUpvotedPosts: (postId) => set((state) => ({ upvotedPosts: [...state.upvotedPosts, postId] })),
  addToDownvotedPosts: (postId) => set((state) => ({ downvotedPosts: [...state.downvotedPosts, postId] })),
  addToUpvotedComments: (commentId) => set((state) => ({ upvotedComments: [...state.upvotedComments, commentId] })),
  addToDownvotedComments: (commentId) =>
    set((state) => ({ downvotedComments: [...state.downvotedComments, commentId] })),
  removeFromUpvotedPosts: (postId) =>
    set((state) => ({ upvotedPosts: state.upvotedPosts.filter((post) => post !== postId) })),
  removeFromDownvotedPosts: (postId) =>
    set((state) => ({ downvotedPosts: state.downvotedPosts.filter((post) => post !== postId) })),
  removeFromUpvotedComments: (commentId) =>
    set((state) => ({ upvotedComments: state.upvotedComments.filter((comment) => comment !== commentId) })),
  removeFromDownvotedComments: (commentId) =>
    set((state) => ({ downvotedComments: state.downvotedComments.filter((comment) => comment !== commentId) })),
  loadUpvotedPosts: (posts) => set({ upvotedPosts: posts }),
  loadDownvotedPosts: (posts) => set({ downvotedPosts: posts }),
  loadUpvotedComments: (comments) => set({ upvotedComments: comments }),
  loadDownvotedComments: (comments) => set({ downvotedComments: comments }),
  resetUser: () =>
    set({
      displayName: '',
      about: '',
      createdAt: new Date(0),
      uid: '',
      isSignedIn: false,
      upvotedPosts: [],
      downvotedPosts: [],
      upvotedComments: [],
      downvotedComments: [],
    }),
}));
