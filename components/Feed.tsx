'use client';

import { FC, useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/config/firebase';
// import { Button } from './ui/button';
import LinkPost from './LinkPost';

interface Post {
  by: string;
  id: string;
  createdAt: { seconds: number; nanoseconds: number };
  score: number;
  title: string;
  url?: string;
  text?: string;
}

const Feed: FC = () => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('createdAt', 'desc'), limit(20));

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const postData: Post[] = [];
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          const { by, createdAt, score, title, url } = doc.data();
          postData.push({ by, createdAt, score, title, url, id: doc.id });
        });
        setPosts(postData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <div className="mt-2">loading posts...</div>;
  }

  return (
    <div className="mt-2">
      {posts.map((post) => (
        <LinkPost
          key={post.id}
          id={post.id}
          by={post.by}
          createdAt={post.createdAt}
          score={post.score}
          title={post.title}
          url={post.url as string}
        />
      ))}
    </div>
  );
};

export default Feed;
