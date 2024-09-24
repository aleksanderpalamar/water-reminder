import WaterIntakeHistory from '@/components/WaterIntakeHistory'
import { auth } from '@clerk/nextjs/server'
import { GlassWater } from 'lucide-react'
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
        <div className="flex items-center space-x-2">
          <GlassWater className="h-10 w-10 text-blue-500" />
          <div className="space-y-1 flex flex-col">
            <h1 className="text-3xl font-bold">Water Reminder</h1>
            <p className="text-sm text-gray-500">Acompanhe sua ingestão de água.</p>
          </div>
        </div>
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 block">
          Voltar
        </Link>        
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Water Intake History</h1>
        <WaterIntakeHistory userId={userId} />
      </div>
    </div>
  )
}