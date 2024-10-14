'use client'

import { useServices } from '@/hooks/use-services';
import { useEffect } from 'react'

export default function HourlyNotifications({ userId }: { userId: string }) {
  const { reminderService } = useServices();
  
  useEffect(() => {
    const checkReminders = async () => {
      try {
        const reminders = await reminderService.getReminders(userId);
        if (reminders.length > 0) {
          new Notification('Beba água, se hidratar é muito importante para você!', {
            body: 'Beba água, se hidratar é muito importante para você!',
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
  }, [userId, reminderService])

  return null // This component doesn't render anything
}