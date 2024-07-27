import React, { ReactNode } from 'react'
import Dashboardnav from '../components/Dashboardnav'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
import prisma from '../lib/db';
import { stripe } from '../lib/stripe';


async function getData({
  email, id, firstName, lastName, profieImage
}: {
  email: string,
  id: string,
  firstName: string | undefined | null,
  lastName: string | undefined | null,
  profieImage: string | undefined | null,
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true
    }
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    let stripeCustomerId;

    // Ensure stripeCustomerId is unique
    while (true) {
      stripeCustomerId = `customer_${Math.random().toString(36).substr(2, 9)}`;
      const existingUser = await prisma.user.findUnique({
        where: {
          stripeCustomerId: stripeCustomerId
        }
      });
      if (!existingUser) break;
    }

    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
        stripeCustomerId: stripeCustomerId,
      }
    });
  }
  if(!user?.stripeCustomerId){
    const data= await stripe.customers.create({
      email:email,
    })
    await prisma.user.update({
      where:{
        id:id,
      },
      data:{
        stripeCustomerId:data.id,
      }
    })
  }
}
const DashboardLayout = async ({children}:{children:ReactNode}) => {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  if(!user){
    redirect("/")
  }
  await getData({email:user.email as string,firstName:user.given_name as string, id:user.id as string , lastName:user.family_name as string,
    profieImage:user.picture 
   })
  return (
  <div className='flex flex-col space-y-6 mt-10'>
    <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
    <aside className='hidden w-[200px] flex-col md:flex'>
        <Dashboardnav/>
    </aside>
     <main>{children}</main>
    </div>
  </div>
  )
}

export default DashboardLayout
