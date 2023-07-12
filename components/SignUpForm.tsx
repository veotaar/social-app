'use client';

import { FC } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { nanoid } from 'nanoid';

import { userStore } from '@/lib/state';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

// interface SignUpFormProps {}

const SignUpForm: FC = () => {
  const router = useRouter();

  const updateDisplayName = userStore((state) => state.updateDisplayName);
  const updateUid = userStore((state) => state.updateUid);
  const updateCreatedAt = userStore((state) => state.updateCreatedAt);
  const updateIsSignedIn = userStore((state) => state.updateIsSignedIn);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const randomId = nanoid(10);
      if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: randomId });

      const userData = {
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        displayName: randomId,
        about: '',
        upvotedPosts: [],
        downvotedPosts: [],
        upvotedComments: [],
        downvotedComments: [],
        createdAt: new Date(Date.parse(userCredential.user.metadata.creationTime as string)),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      // await setDoc(doc(db, 'users', userCredential.user.uid, 'likes', userCredential.user.uid), {
      //   posts: ['postid'],
      //   comments: ['commentid'],
      // });

      updateDisplayName(userData.displayName);
      updateUid(userCredential.user.uid);
      updateCreatedAt(userData.createdAt);
      updateIsSignedIn(true);

      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-sm space-y-8 rounded border p-4 shadow-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              {/* <FormDescription>Type your email</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>8 characters minimum</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Account</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
