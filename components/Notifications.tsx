'use client'

import { useState, useEffect } from 'react'
import { WaterReminderDialog } from './WaterReminderDialog'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { useServices } from '@/contexts/WaterIntakeContext'

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

  const { reminderService } = useServices()

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const fetchedReminders = await reminderService.getReminders(userId);
        setReminders(fetchedReminders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reminders:', err)
        setError('Failed to load reminders. Please try again later.')
        setLoading(false)
      }
    }

    fetchReminders()
  }, [userId, reminderService])

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
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl bg-zinc-800 flex items-center justify-center">
          <Loader2 className="w-6 h-6 mx-auto animate-spin" />
        </Skeleton>
      </div>
    )
  }

  if (error) {
    return <div className="text-rose-500 bg-rose-100 p-6 rounded-lg shadow-md">{error}</div>
  }

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
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