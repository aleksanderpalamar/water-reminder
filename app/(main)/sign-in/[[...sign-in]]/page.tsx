import { SignIn } from '@clerk/nextjs'
import { GlassWater } from 'lucide-react'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center justify-center space-y-2 mb-8 p-4 text-wrap'>
        <GlassWater className='h-16 w-16 text-blue-500' />
        <h1 className='text-6xl font-bold'>Water Reminder</h1>
        <p className='text-2xl text-gray-500 dark:text-gray-400'>
          Acompanhe a sua ingestão de água.
        </p>
      </div>
      <SignIn />
    </div>
  )
}