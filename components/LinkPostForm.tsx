'use client';

import { FC } from 'react';
// import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

import { userStore } from '@/lib/state';
import { Textarea } from './ui/textarea';

// import { useRouter } from 'next/navigation';

const formSchema = z.object({
  url: z.string().url({ message: 'Invalid url' }),
  title: z
    .string()
    .min(1, {
      message: 'Title must be at least 1 character.',
    })
    .max(300, {
      message: '300 characters maximum',
    }),
});

const LinkPostForm: FC = () => {
  const userName = userStore((state) => state.displayName);
  // const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      title: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const postsRef = collection(db, 'posts');
    const post = {
      createdAt: serverTimestamp(),
      by: userName,
      score: 0,
      title: values.title,
      url: values.url,
    };
    await addDoc(postsRef, post);
    console.log(values.title, values.url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm space-y-8 rounded border p-4 shadow-sm">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="Paste link here" {...field} />
              </FormControl>
              {/* <FormDescription>Type your email</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea placeholder="Title" {...field} />
              </FormControl>
              {/* <FormDescription>8 characters minimum</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LinkPostForm;
