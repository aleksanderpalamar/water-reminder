import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex items-center space-x-2 mb-8 p-4 text-wrap'>
        <Image
          src="/assets/Botle-of-water-man.svg"
          alt="Logo"
          width={2000}
          height={2000}
          className="h-28 w-28 overflow-hidden object-cover"
          priority
          quality={100}
        />
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold text-[#5DCCFC]'>Water Reminder</h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Acompanhe a sua ingestão de água.
          </p>
        </div>
      </div>
      <SignIn />
    </div>
  )
}