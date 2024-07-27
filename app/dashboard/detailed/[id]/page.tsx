import prisma from '@/app/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import React from 'react';

async function getData({ userId, noteId }: { userId: string; noteId: string }) {
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      title: true,
      description: true,
    },
  });
  return data;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ userId: user?.id as string, noteId: params.id });

  if (!data) {
    return <p>Note not found</p>;
  }

  return (
    <div className='grid items-start gap-y-8'>
      <div className='flex items-center justify-between px-2'>
        <Card className='flex-grow'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-3xl md:text-4xl'>{data.title}</CardTitle>
              <Link href='/dashboard'>
                <Button className='ml-4'>
                  Back
                </Button>
              </Link>
            </div>
            <CardDescription>
              <p className='text-lg text-muted-foreground'>
                Here you can see details of the note
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
