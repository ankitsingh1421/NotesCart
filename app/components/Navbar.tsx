import Link from 'next/link'
import React, { use } from 'react'
import { Themetoggle } from './Themetoggle'
import { Button } from '@/components/ui/button';
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Usernav from './Usernav';


const Navbar = async () => {

    const {isAuthenticated,getUser } = getKindeServerSession();
    const user = await getUser();
    return (
    <div>
      <div className='border-b bg-background h-[10vh] flex items-center'>
   <div className='container flex items-center justify-between'>
    <Link href="">
    <h1 className='font-bold text-3xl'>Note<span className='text-primary'>Craft</span></h1>
    </Link>
    <div className='flex items-center gap-x-5'>
        <Themetoggle/>
   { (await isAuthenticated())?(
       <Usernav email={user?.email as string} image={user?.picture as string} name={user?.given_name as string}/>
   ):(
    <div className='flex items-center gap-5 '>
    <LoginLink>
    <Button>Sign In</Button>
    </LoginLink>
    <RegisterLink>
    <Button variant={'secondary'}>Sign up</Button>
    </RegisterLink>
    </div>
   )}
    </div>
   </div>

      </div>

    </div>
  )
}

export default Navbar
