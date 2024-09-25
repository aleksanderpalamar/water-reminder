import { Logo } from '@/components/ui/logo'
import WaterIntakeHistory from '@/components/WaterIntakeHistory'
import { auth } from '@clerk/nextjs/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function HistoryPage() {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex w-full items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <Logo />
        <Link href="/" className="text-[#5DCCFC] hover:text-sky-400 transition-colors text-sm font-medium mb-4 block">
          <ArrowLeft className="h-6 w-6 inline mr-2" />
          Voltar
        </Link>        
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#5DCCFC] mb-8">
          Water Intake History
        </h1>
        <WaterIntakeHistory userId={userId} />
      </div>
    </div>
  )
}