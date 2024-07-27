// import prisma from "@/app/lib/db";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
// import React from "react";
// async function getData(userId:string) {
//   const data = await prisma.user.findUnique({
//     where:{
//       id:userId,
//     },
//     select:{
//       name:true,
//       email:true,
//       colorScheme:true
//     },
//   })
//   return data;  
// }
// const page = async() => {
//   const {getUser} = getKindeServerSession();
//   const user = await getUser();
//   const data = await getData(user?.id as string); 
//   return (
//     <div className="grid items-start gap-6">
//       <div className="flex items-center justify-between px-2">
//         <div className="grid gap-1">
//           <h1 className="text-3xl md:text-4xl"> Setting</h1>
//           <p className="text-lg text-muted-foreground"> Your profie setting </p>
//         </div>
//       </div>
//       <Card>
//         <form>
//           <CardHeader>
//           <CardTitle>General Data</CardTitle>
//            <CardDescription>Please provide general information about your self and dont forgat to save !</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//    <div className="space-y-1">
//   <Label>Your Name</Label>
//   <Input
//   name="name"
//   type="text"
//   id="name"
//   placeholder="Your name"
//   defaultValue={data?.name ?? undefined}
//   />
//    </div>
//    <div className="space-y-1">
//   <Label>Your Email</Label>
//   <Input  
//   name="email"
//   type="text"
//   id="email"
//   placeholder="Your Email"
//   defaultValue={data?.email as string}
//   disabled
//   />
//    </div>
//    <div className="space-y-1">
//     <Label>Color Scheme</Label>
// <Select name="color" defaultValue={data?.colorScheme}>
//   <SelectTrigger className="w-full">
//     <SelectValue placeholder="Select a color"/>
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Color</SelectLabel>
//     <SelectItem value="theme-green">Green</SelectItem>
//     <SelectItem value="theme-Blue">Blue</SelectItem>
//     <SelectItem value="theme-Voilet">Voilet</SelectItem>
//     <SelectItem value="theme-Orange">Orange</SelectItem>
//     <SelectItem value="theme-Yellow">Yellow</SelectItem>
//     <SelectItem value="theme-Red">Red</SelectItem>
//     <SelectItem value="theme-Rose">Rose</SelectItem>
//         </SelectGroup>
//       </SelectContent>
// </Select>
//    </div>
//             </div>
//           </CardContent>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default page;
" use client ";
import { SubmitButton } from "@/NotesCart/app/components/Submitbutton";
import prisma from "@/NotesCart/app/lib/db";
import { Button } from "@/NotesCart/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/NotesCart/components/ui/card";
import { Input } from "@/NotesCart/components/ui/input";
import { Label } from "@/NotesCart/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/NotesCart/components/ui/select";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });
  return data;
}

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  const postData = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        colorScheme: colorScheme ?? undefined,
      },
    });
    revalidatePath("/","layout");
  };

  return (
    <div className="grid items-start gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Setting</h1>
          <p className="text-lg text-muted-foreground">Your profile settings</p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself and dont forget to save!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your name"
                  defaultValue={data?.name ?? ""}
                />
              </div>
              <div className="space-y-1">
                <Label>Your Email</Label>
                <Input
                  name="email"
                  type="text"
                  id="email"
                  placeholder="Your Email"
                  defaultValue={data?.email ?? ""}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label>Color Scheme</Label>
                <Select name="color" defaultValue={data?.colorScheme ?? "theme-blue"}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-voilet">Violet</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {/* <Button type="submit">Save now</Button> */}
            <SubmitButton/>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Page;


