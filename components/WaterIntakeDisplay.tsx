'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle } from 'lucide-react'
import { Skeleton } from './ui/skeleton'

interface Reminder {
  id: string
  containerSize: number
  reminderTime: string
}

const DAILY_GOAL = 3700 // ml

export default function WaterIntakeDisplay({ userId }: { userId: string }) {
  const [waterIntake, setWaterIntake] = useState(0)
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intakeResponse, remindersResponse] = await Promise.all([
          fetch(`/api/water-intake?userId=${userId}`),
          fetch(`/api/reminders?userId=${userId}`)
        ])

        if (!intakeResponse.ok || !remindersResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const intakeData = await intakeResponse.json()
        const remindersData = await remindersResponse.json()

        setWaterIntake(intakeData.waterIntake)
        setReminders(remindersData.reminders)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again later.')
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const addWaterIntake = async (amount: number) => {
    try {
      const response = await fetch('/api/water-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to update water intake')
      }

      const data = await response.json()
      setWaterIntake(data.waterIntake)
    } catch (err) {
      console.error('Error updating water intake:', err)
      setError('Failed to update water intake. Please try again.')
    }
  }

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
    return <div className="bg-white p-6 rounded-lg shadow-md text-red-500">{error}</div>
  }

  const percentage = Math.min((waterIntake / DAILY_GOAL) * 100, 100)

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-[#5DCCFC] mb-4">Today&apos;s Water Intake</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#5DCCFC] bg-[#E2E8F0]">
              {waterIntake} ml / {DAILY_GOAL} ml
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-[#5DCCFC]">
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#E2E8F0]">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#5DCCFC]"
          ></div>
        </div>
      </div>
      {reminders.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {reminders.map((reminder) => (
              <Button
                key={reminder.id}
                onClick={() => addWaterIntake(reminder.containerSize)}
                className="flex items-center space-x-1 text-[#5DCCFC] hover:bg-sky-400/10 hover:text-sky-50 transition-colors"
                variant="ghost"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{reminder.containerSize} ml</span>
              </Button>
              
            ))}
          </div>
        </div>
      )}
    </div>
  )
}