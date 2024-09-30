'use client'

import { useState, useEffect } from 'react'
import { WaterReminderDialog } from './WaterReminderDialog'
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null)

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch(`/api/reminders?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch reminders')
        }
        const data = await response.json()
        setReminders(data.reminders)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching reminders:', err)
        setError('Failed to load reminders. Please try again later.')
        setLoading(false)
      }
    }

    fetchReminders()
  }, [userId])

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      reminders.forEach((reminder) => {
        const [reminderHour, reminderMinute] = reminder.reminderTime.split(':').map(Number)
        
        if (currentHour > reminderHour || (currentHour === reminderHour && currentMinute >= reminderMinute)) {
          const hoursSinceReminder = (currentHour - reminderHour + 24) % 24
          const minutesSinceReminder = currentMinute - reminderMinute

          if (hoursSinceReminder === 0 && minutesSinceReminder === 0) {
            showNotification(reminder)
          } else if (hoursSinceReminder > 0 && minutesSinceReminder === 0) {
            showNotification(reminder)
          }
        }
      })
    }

    const intervalId = setInterval(checkReminders, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [reminders])

  const showNotification = (reminder: Reminder) => {
    // Audio alert
    const audio = new Audio('/audio/notification.mp3')
    audio.play().catch((error) => console.error('Error playing audio:', error))

    // Speak the message
    const message = "Beba água, se hidratar é muito importante para saúde!"
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message)
      speechSynthesis.speak(utterance)
    }

    // Show custom dialog
    setCurrentReminder(reminder)
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div>Loading reminders...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-[#5DCCFC] mb-4">Reminders</h2>
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
                className="h-8 w-8 overflow-hidden object-cover"
                priority
                quality={100}
              />
              <span>
                {reminder.reminderTime} - Drink {reminder.containerSize}ml of water
              </span>
            </li>
          ))}
        </ul>
      )}
      {currentReminder && (
        <WaterReminderDialog
          isOpen={isDialogOpen}
          containerSize={currentReminder.containerSize}
        />
      )}
    </div>
  )
}