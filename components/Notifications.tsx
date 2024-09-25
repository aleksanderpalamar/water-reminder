'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Reminder {
  id: string
  containerSize: number
  reminderTime: string
}

export default function Notifications({ userId }: { userId: string }) {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch(`/api/reminders?userId=${userId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setReminders(data.reminders)
      } catch (e) {
        console.error('Error fetching reminders:', e)
        setError('Failed to load reminders. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchReminders()
  }, [userId])

  if (loading) return <div>Loading reminders...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#5DCCFC] mb-4">
        Reminders
      </h2>
      {reminders.length === 0 ? (
        <p>No reminders set. Add a reminder to get started!</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="flex items-center space-x-2">
              <Image 
                src="/assets/Bottle-of-water.svg"
                alt="Bottle of water"
                width={2000}
                height={2000}
                className="h-6 w-6 overflow-hidden object-cover"
                priority
                quality={100}
              />
              <span className="text-gray-700 dark:text-gray-300 antialiased text-sm">
                {reminder.reminderTime} - Drink {reminder.containerSize}ml of water
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}