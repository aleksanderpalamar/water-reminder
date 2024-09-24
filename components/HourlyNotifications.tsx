'use client'

import { useEffect } from 'react'

export default function HourlyNotifications({ userId }: { userId: string }) {
  useEffect(() => {
    const checkReminders = async () => {
      try {
        const response = await fetch(`/api/reminders?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch reminders')
        }
        const data = await response.json()
        if (data.reminders.length > 0) {
          new Notification('Water Reminder', {
            body: "It's time to drink water!",
            icon: '/water-icon.png',
          })
        }
      } catch (error) {
        console.error('Error checking reminders:', error)
      }
    }

    if ('Notification' in window) {
      Notification.requestPermission()
    }

    // Check reminders immediately and then every hour
    checkReminders()
    const intervalId = setInterval(checkReminders, 60 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [userId])

  return null // This component doesn't render anything
}