'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from './ui/skeleton'
import { Loader2 } from 'lucide-react'
import { useServices } from '@/hooks/use-services'

interface WaterIntake {
  date: string
  amount: number
}

const DAILY_GOAL = 3700 // ml

export default function WaterIntakeHistory({ userId }: { userId: string }) {
  const [history, setHistory] = useState<WaterIntake[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { waterIntakeHistoryService } = useServices()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await waterIntakeHistoryService.getWaterIntakeHistory(userId)
        setHistory(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching water intake history:', err)
        setError('Failed to load water intake history. Please try again later.')
        setLoading(false)
      }
    }

    fetchHistory()
  }, [userId, waterIntakeHistoryService])

  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl bg-zinc-800 flex items-center justify-center">
          <Loader2 className="w-6 h-6 mx-auto animate-spin" />
        </Skeleton>
      </div>
    )
  }

  if (error) {
    return <div className="bg-rose-100/10 p-6 rounded-lg shadow-md text-rose-500">{error}</div>
  }

  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
      {history.length === 0 ? (
        <p>Você ainda não tem nenhum registro de ingestão de água.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry) => {
            const entryDate = new Date(entry.date)
            const formattedDate = entryDate.toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              timeZone: 'UTC'
            })
            return (
              <li key={entry.date} className="border-b pb-4 border-zinc-700 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sky-400 antialiased">{formattedDate}</span>
                  <span className="text-[#5DCCFC]">{entry.amount} ml / {DAILY_GOAL} ml</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-sky-400/10">
                    <div
                      style={{ width: `${Math.min((entry.amount / DAILY_GOAL) * 100, 100)}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#5DCCFC]"
                    ></div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}