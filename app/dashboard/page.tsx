// "use Client";
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import prisma from '../lib/db';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { Edit, File, Loader2, Trash, View, ViewIcon } from 'lucide-react';
// import { redirect } from 'next/navigation';
// import { Card } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { revalidatePath } from 'next/cache';
// import { useState } from 'react';
// import NoteActions from '../components/NoteActions';

// async function getData(userId: string) {
//   const data = await prisma.note.findMany({
//     where: {
//       userId: userId,
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });
//   return data;
// }

// const Page = async () => {
//   const { getUser } = getKindeServerSession();
//   const [loadingNoteId, setLoadingNoteId] = useState<string | null>(null);
//   const user = await getUser();
  
//   if (!user) {
//     redirect('/');
//     return;
//   }

//   const data = (await getData(user.id)) || []; // Ensure data is an array

  
//   async function deleteNote(noteId: string) {
//     "use server";
//     setLoadingNoteId(noteId);
//     await prisma.note.delete({
//       where: {
//         id: noteId,
//       },
//     });
//     setLoadingNoteId(null);
//     revalidatePath("/dashboard");
//   }

//   return (
//     <div className='grid items-start gap-y-8'>
//       <div className='flex items-center justify-between px-2'>
//         <div className='grid gap-1'>
//           <h1 className='text-3xl md:text-4xl '>Your Notes</h1>
//           <p className='text-lg text-muted-foreground'>
//             Here you can see and create new notes
//           </p>
//         </div>
//         <Button asChild>
//           <Link href='/dashboard/new'>Create a new Note</Link>
//         </Button>
//       </div>
//       {data.length < 1 ? (
//         <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
//           <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
//             <File className='w-10 h-10 text-primary' />
//           </div>
//           <h2 className='mt-6 text-xl font-semibold'>You dont have any notes created</h2>
//           <p className='mb-8 mt-2 text-center text-sm leading text-muted-foreground mx-w-sm mx-auto'>
//             You currently dont have any notes. Please create some so that you can see them right here.
//           </p>
//           <Button asChild>
//             <Link href='/dashboard/new'>Create now</Link>
//           </Button>
//         </div>
//       ) : (
//         <div className='flex flex-col gap-y-4'>
//           {data.map((item)=>(
//             <Card key={item.id}
//             className='flex items-center justify-between p-4'>
//               <div>
//                 <h2 className='font-semibold text-xl text-primary'>
//                   {item.title}
//                 </h2> 
//                 <p>{new Intl.DateTimeFormat('en-US',{
//                   dateStyle:'full'
//                 }).format(new Date(item.createdAt))}</p>
//               </div>
//               <div className='flex gap-x-4'>
//               <Link href={`/dashboard/detailed/${item.id}`}>
//                   <Button variant='outline' size='icon'> 
//                     <ViewIcon className='w-4 h-4'/>
//                   </Button>
//                 </Link>
//                 <Link href={`/dashboard/new/${item.id}`}>
//                   <Button variant='outline' size='icon'> 
//                     <Edit className='w-4 h-4'/>
//                   </Button>
//                 </Link>
//                 {/* <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     deleteNote(item.id);
//                   }}
//                 >
//                   <input type='hidden' name='noteId' value={item.id} />
//                   <Button
//                     variant={"destructive"}
//                     size={"icon"}
//                     type='submit'
//                     disabled={loadingNoteId === item.id}
//                   >
//                     {loadingNoteId === item.id ? <Loader2 /> : <Trash className='h-4 w-4' />}
//                   </Button>
//                 </form> */}
//                 <NoteActions noteId={item.id} onDelete={deleteNote}/>
//               </div>
//             </Card>
//           ))}  
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;

// app/dashboard/page.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '../lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Edit, File, View, ViewIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import NoteActions from '../components/NoteActions';
import { revalidatePath } from 'next/cache';

async function getData(userId: string) {
  const data = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    redirect('/');
    return;
  }

  const data = (await getData(user.id)) || []; // Ensure data is an array

  async function deleteNote(noteId: string) {
    "use server";
    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    revalidatePath("/dashboard");
  }

  return (
    <div className='grid items-start gap-y-8'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='text-3xl md:text-4xl '>Your Notes</h1>
          <p className='text-lg text-muted-foreground'>
            Here you can see and create new notes
          </p>
        </div>
        <Button asChild>
          <Link href='/dashboard/new'>Create a new Note</Link>
        </Button>
      </div>
      {data.length < 1 ? (
        <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
            <File className='w-10 h-10 text-primary' />
          </div>
          <h2 className='mt-6 text-xl font-semibold'>You dont have any notes created</h2>
          <p className='mb-8 mt-2 text-center text-sm leading text-muted-foreground mx-w-sm mx-auto'>
            You currently dont have any notes. Please create some so that you can see them right here.
          </p>
          <Button asChild>
            <Link href='/dashboard/new'>Create now</Link>
          </Button>
        </div>
      ) : (
        <div className='flex flex-col gap-y-4'>
          {data.map((item) => (
            <Card key={item.id} className='flex items-center justify-between p-4'>
              <div>
                <h2 className='font-semibold text-xl text-primary'>
                  {item.title}
                </h2>
                <p>{new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'full'
                }).format(new Date(item.createdAt))}</p>
              </div>
              <div className='flex gap-x-4'>
                <Link href={`/dashboard/detailed/${item.id}`}>
                  <Button variant='outline' size='icon'>
                    <ViewIcon className='w-4 h-4' />
                  </Button>
                </Link>
                <Link href={`/dashboard/new/${item.id}`}>
                  <Button variant='outline' size='icon'>
                    <Edit className='w-4 h-4' />
                  </Button>
                </Link>
                <NoteActions noteId={item.id} onDelete={deleteNote} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
