import { Button } from '@/NotesCart/components/ui/button'
import { Card } from '@/NotesCart/components/ui/card'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-[80vh] flex items-center justify-center'>
        <Card className='w-[350px]'>
            <div className='p-6'>
                <div className='w-full flex justify-center'>
                    <XIcon className='w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2'/>
                </div>
                 <div className='mt-3 text-center sm:mt-5 w-full'>
                  <h3 className='text-lg leading-6 font-medium'>Payment Failed</h3>
                  <div className='mt-2'>
                    <p className='text-sm text-muted-foreground'>
                      No worries , You wont be charged. Please try again
                    </p>
                  </div>
    <div className='mt-5 sm:mt-6 w-full'>
      <Button className='w-full' asChild>
        <Link href='/'>GO back to dashboard</Link>
      </Button>
    </div>
                 </div>
            </div>
        </Card>
      
    </div>
  )
}

export default page
