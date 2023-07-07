import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LinkPostForm from '@/components/LinkPostForm';

const SubmitPage: FC = () => {
  return (
    <div className="mx-auto max-w-5xl py-2">
      <Tabs defaultValue="url" className="">
        <TabsList>
          <TabsTrigger value="url">Link post</TabsTrigger>
          <TabsTrigger value="text">Text post</TabsTrigger>
        </TabsList>
        <TabsContent value="url">
          <LinkPostForm />
        </TabsContent>
        <TabsContent value="text">Text post form here</TabsContent>
      </Tabs>
    </div>
  );
};

export default SubmitPage;
