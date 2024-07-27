" use client ";
import { Button } from "@/NotesCart/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/NotesCart/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import React from "react";
import prisma from "@/NotesCart/app/lib/db";
import { Select } from "@/NotesCart/components/ui/select";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { error } from "console";
import { getStripeSession, stripe } from "@/NotesCart/app/lib/stripe";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";

const featureItems = [
  { name: "Organize Your Notes Efficiently" },
  { name: "Access Your Notes Anytime, Anywhere" },
  { name: "Collaborate with Others Seamlessly" },
  { name: "Stay Organized with Tags and Categories" },
  { name: "Search and Find Notes Instantly" },
];
async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });
  return data;
}

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  async function createSubscription() {
    "use server";
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    if (!dbUser?.stripeCustomerId) {
      throw new Error("unable to get customer id ");
    }
    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });
    return redirect(subscriptionUrl);
  }
  async function createCustomerPortal() {
    " use server";
const Session = await stripe.billingPortal.sessions.create({
  customer:data?.user.sripeCustomerId as string,
  return_url:"http://localhost:3000/dashboard",
})
  }
  if (data?.status === "active")
    return(
      <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl ">Subscription</h1>
          <p className="text-lg text-muted-foreground">Settings regarding your Subscprition</p>
        </div>
      </div>
      <Card className="w-full lg:w-2/3">
      <CardHeader>
        <CardTitle>
           Edit Subscription
        </CardTitle>
        <CardDescription>
          click on the button below,this will give you the opportunity to change your payment details and view tour statement at the same time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createCustomerPortal}>
          <Button>
            Lounch Portal
          </Button>
        </form>
      </CardContent>
      </Card>
    </div>
  )
  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8 ">
          <div>
            <h3 className="inline-flex px-4 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              monthly{" "}
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            ₹19 <span className="ml-1 text-2xl text-muted-foreground"></span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            write any notes as u want for ₹19 a month{" "}
          </p>
        </CardContent>
        <div className="flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg space-y-6 sm:p-10">
          <ul className="space-y-4">
            {featureItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="flex-shrink-0 ">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.name}</p>
              </li>
            ))}
          </ul>
          <form className="w-full" action={createSubscription}>
            <Button className="w-full">Buy now </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default page;
