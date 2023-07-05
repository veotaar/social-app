'use client';

import { FC } from 'react';
// import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userStore } from '@/lib/state';

import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { isUsernameAlreadyExists } from '@/lib/helpers';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

// import { useRouter } from 'next/navigation';

const formSchema = z.object({
  displayName: z
    .string()
    .min(4, { message: 'Display name must be 4 to 16 characters long.' })
    .max(16, { message: 'Display name must be 4 to 16 characters long.' }),
  about: z.string().max(500, { message: 'Must not exceed 500 characters.' }),
});

const SettingsForm: FC = () => {
  const { toast } = useToast();
  const displayName = userStore((state) => state.displayName);
  const about = userStore((state) => state.about);
  const updateDisplayName = userStore((state) => state.updateDisplayName);
  const updateAbout = userStore((state) => state.updateAbout);

  // const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: `${displayName}`,
      about: `${about}`,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!auth.currentUser) return;
    if (displayName === values.displayName && about === values.about) return;

    const userRef = doc(db, 'users', auth.currentUser.uid);

    // only 'about' is changed
    if (about !== values.about && displayName === values.displayName) {
      await updateDoc(userRef, {
        about: values.about,
      });
      updateAbout(values.about);
      return;
    }

    const exists = await isUsernameAlreadyExists(values.displayName);

    if (exists) {
      toast({
        variant: 'destructive',
        title: 'Username already exists',
        description: 'Try another username.',
      });
      return;
    }

    // only 'displayName' is changed
    if (displayName !== values.displayName && about === values.about) {
      await updateProfile(auth.currentUser, { displayName: values.displayName });
      await updateDoc(userRef, {
        displayName: values.displayName,
      });
      updateDisplayName(values.displayName);
      return;
    }

    // both changed
    await updateProfile(auth.currentUser, { displayName: values.displayName });
    await updateDoc(userRef, {
      displayName: values.displayName,
      about: values.about,
    });
    updateDisplayName(values.displayName);
    updateAbout(values.about);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm space-y-4 rounded p-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder="About you" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
