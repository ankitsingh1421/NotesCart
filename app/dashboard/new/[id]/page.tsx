// import React from 'react'
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import Link from 'next/link';
// import prisma from '@/app/lib/db';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { error } from 'console';
// import { redirect } from 'next/navigation';


// async function getData({userId,noteId}:{userId:string;noteId:string}) {
//     const data = await prisma.note.findUnique({
//         where:{
//             id:noteId,
//             userId:userId,
//         },
//         select:{
//             title:true,
//             description:true,
//             id:true,
//         },
//     });
//     return data ;
// }

// const DynamicRoute = async ({ params }: { params: { id: string } }) => {
//     const { getUser } = getKindeServerSession();
//     const user = await getUser(); 
//     const data = await getData({userId:user?.id as string , noteId:params.id})

//     async function postData(formData:FormData) {
//         "use server"
// if(!user) throw new Error("you are not allowed");

// const title = formData.get('title') as string;
// const description = formData.get('description') as string;
// await prisma.note.update({
//     where:{
//         id:data?.id,
//         userId:user.id,
//     },
//     data:{
//    title:title,
//    description:description,
//     }
// })
//    return redirect("/dashboard");
//     }

//   return (
//     <Card>
//     <form   >
//       <CardHeader>
//         <CardTitle>Edit Note</CardTitle>
//         <CardDescription>Right here you can now Edit  your  notes</CardDescription>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-y-5">
//         <div className="gap-y-2 flex flex-col">
//           <Label>Title</Label>
//           <Input required type="text" name="title" placeholder="Title for your note" 
//           defaultValue={data?.title}/>
//         </div>
//         <div className="flex flex-col gap-y-2">
//           <Label>Description</Label>
//           <Textarea name="description" placeholder="Describe your note as you want" required
//           defaultValue={data?.description}
//           />
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="destructive" asChild>
//           <Link href="/dashboard">Cancel</Link>
//         </Button>
//         <Button className="w-fit" type="submit">
//         Save now
//       </Button>
//       </CardFooter>
//     </form>
//   </Card>
//   )
   
// }

// export default DynamicRoute



import React from 'react';
import { Button } from '@/NotesCart/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/NotesCart/components/ui/card';
import { Input } from '@/NotesCart/components/ui/input';
import { Label } from '@/NotesCart/components/ui/label';
import { Textarea } from '@/NotesCart/components/ui/textarea';
import Link from 'next/link';
import prisma from '@/NotesCart/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

async function getData({ userId, noteId }: { userId: string; noteId: string }) {
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      title: true,
      description: true,
      id: true,
    },
  });
  return data;
}

const DynamicRoute = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    // Handle unauthorized access
    return (
      <div>
        <h1>Access Denied</h1>
        <Button asChild>
          <Link href="/dashboard">Go back</Link>
        </Button>
      </div>
    );
  }

  const data = await getData({ userId: user.id as string, noteId: params.id });

  async function postData(formData: FormData) {
    "use server";

    if (!user) throw new Error("You are not allowed");

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: user.id,
      },
      data: {
        title: title,
        description: description,
      },
    });

    return redirect("/dashboard");
  }

  return (
    <Card>
      <form action={postData} method="post">
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>Right here you can now edit your notes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for your note"
              defaultValue={data?.title}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your note as you want"
              required
              defaultValue={data?.description}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="destructive" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button className="w-fit" type="submit">
            Save now
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DynamicRoute;
