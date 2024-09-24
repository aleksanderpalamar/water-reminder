'use client'

import { useState, useEffect } from 'react'
import { BellIcon } from 'lucide-react'

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
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        Reminders
      </h2>
      {reminders.length === 0 ? (
        <p>No reminders set. Add a reminder to get started!</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="flex items-center space-x-2">
              <BellIcon className="text-blue-500" />
              <span>
                {reminder.reminderTime} - Drink {reminder.containerSize}ml of water
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}