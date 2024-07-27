// import { headers } from "next/headers";
// import Stripe from 'stripe';
// import prisma from "@/app/lib/db";
// import { threadId } from "worker_threads";
// import { SubscriptIcon } from "lucide-react";
// import { Stats } from "fs";
// export async function POST(req:Request) {
//     const body = await req.text();
//     const signature = headers().get("Stripe-Signature") as String;
//      let event :Stripe.Event;
//      try {
//         event = Stripe.webhooks.constructEvent(
//             body,
//             signature,
//             process.env.STRIPE_WEBHOOK_SECRET as String,
//         )
//      } catch (error:unknown) {
//         return new Response ("webhooks error",{status:400});
//      }

//      const session = event.data.object as Stripe.Checkout.Session;

//      if(event.type === "checkout.session.completed"){
//         const subscription = await Stripe.subscription.retrive(
//             session.subscription as string    
//            )
//      }
//     const customerId = String(session.customer)
//     const user = await prisma.user.findUnique({
//         where:{
//             stripeCustomerId:customerId,
//         },
//     });
//      if(!user) throw new Error ("user not found... ");
//      await prisma.subscription.create({
//         data:{
//             stripeSubscriptionId:subscription.id,
//             userId:user.id,
//             currentPeriodStart:Subscript.current_Period_Start,
//             currentPeriodEnd:subscription.current_Period_End,
//             status:subscription.status,
//             planId:subscription.items.data[0].plan.id,
//             interval:String(subscription.items.data[0].plan.interval)
//         }
//      })

//      if(event.type === "invoice.payment_succeeded"){
//         const subscription = await stripe.subscription.retrive(
//             session.subscription as String
//         );
//         await prisma.subscription.update({
//             where:{
//                 stripeSubscriptionId:subscription.id,
//             },
//             data:{
//                 planId:subscription.items.data[0].price.id,
//                 currentPeriodStart:subscription.current_Period_Start,
//                 currentPeriodEnd:subscription.current_Period_End,
//                 status:subscription.status,
//              }
//         })
//      }

//      return new Response(null, {Status:200})
// }