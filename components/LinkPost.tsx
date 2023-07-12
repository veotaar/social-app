import { FC, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Triangle } from 'lucide-react';
import { extractBaseUrl, cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  addScoreToPost,
  addPostToUpvotes,
  removePostFromUpvotes,
  addPostToDownvotes,
  removePostFromDownvotes,
  moveFromDownvotesToUpvotes,
  moveFromUpvotesToDownvotes,
} from '@/lib/helpers';
import { userStore } from '@/lib/state';

interface LinkPostProps {
  by: string;
  id: string;
  createdAt: { seconds: number; nanoseconds: number };
  score: number;
  title: string;
  url: string;
}

const LinkPost: FC<LinkPostProps> = (props) => {
  const { by, id, createdAt, score, title, url } = props;

  const uid = userStore((state) => state.uid);
  const upvotedPosts = userStore((state) => state.upvotedPosts);
  const downvotedPosts = userStore((state) => state.downvotedPosts);
  const addToUpvotedPosts = userStore((state) => state.addToUpvotedPosts);
  const addToDownvotedPosts = userStore((state) => state.addToDownvotedPosts);
  const removeFromUpvotedPosts = userStore((state) => state.removeFromUpvotedPosts);
  const removeFromDownvotedPosts = userStore((state) => state.removeFromDownvotedPosts);

  const [vote, setVote] = useState(upvotedPosts.includes(id) ? 1 : downvotedPosts.includes(id) ? -1 : 0);
  const [initialVote] = useState(upvotedPosts.includes(id) ? 1 : downvotedPosts.includes(id) ? -1 : 0);

  const time = formatDistanceToNow(new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000), {
    addSuffix: true,
  });

  const handleUpvote: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (vote === 0) {
      setVote(1);
      addScoreToPost(id, 1);
      addPostToUpvotes(uid, id); // firestore database
      addToUpvotedPosts(id); // local state
      return;
    }

    if (vote === 1) {
      setVote(0);
      addScoreToPost(id, -1);
      removePostFromUpvotes(uid, id); // firestore database
      removeFromUpvotedPosts(id); // local state
      return;
    }

    if (vote === -1) {
      setVote(1);
      addScoreToPost(id, 2);
      moveFromDownvotesToUpvotes(uid, id); // firestore database
      removeFromDownvotedPosts(id); // local state
      addToUpvotedPosts(id); // local state
    }
  };

  const handleDownvote: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (vote === 0) {
      setVote(-1);
      addScoreToPost(id, -1);
      addPostToDownvotes(uid, id); // firestore database
      addToDownvotedPosts(id); // local state
      return;
    }

    if (vote === 1) {
      setVote(-1);
      addScoreToPost(id, -2);
      moveFromUpvotesToDownvotes(uid, id); // firestore database
      removeFromUpvotedPosts(id); // local state
      addToDownvotedPosts(id); // local state
      return;
    }

    if (vote === -1) {
      setVote(0);
      addScoreToPost(id, 1);
      removePostFromDownvotes(uid, id); // firestore database
      removeFromDownvotedPosts(id); // local state
    }
  };

  return (
    <div className="mb-4 flex items-center gap-3" key={id}>
      <div className="flex w-8 flex-col items-center justify-center">
        <button type="button" className="" onClick={handleUpvote}>
          <Triangle
            size={12}
            strokeWidth={2}
            className={cn(
              vote === 1 && 'fill-orange-600 stroke-orange-600',
              vote !== 1 && 'stroke-gray-400 dark:stroke-gray-600'
            )}
          />
        </button>

        <p className="text-sm">{score + vote - initialVote}</p>

        <button type="button" onClick={handleDownvote}>
          <Triangle
            size={12}
            strokeWidth={2}
            className={cn(
              'rotate-180',
              vote === -1 && 'fill-gray-600 stroke-gray-600 dark:fill-gray-400 dark:stroke-gray-400',
              vote !== -1 && 'stroke-gray-400 dark:stroke-gray-600'
            )}
          />
        </button>
      </div>
      <div>
        <div>
          <a href={url}>{title}</a>{' '}
          <span className="text-sm text-muted-foreground">{url && `(${extractBaseUrl(url)})`}</span>
        </div>
        <div className="flex h-5 items-center space-x-2 text-muted-foreground">
          <div>
            submitted {time} by <span>{by}</span>
          </div>
          <Separator orientation="vertical" />
          <div>0 comments</div>
        </div>
      </div>
    </div>
  );
};

export default LinkPost;
