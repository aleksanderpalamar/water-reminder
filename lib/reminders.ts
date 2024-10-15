import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getReminders(userId: string, date: string) {
  try {
    const startOfDay = new Date(date)
    startOfDay.setUTCHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setUTCHours(23, 59, 59, 999)

    const reminders = await prisma.reminder.findMany({
      where: {
        userId: userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      },
    })

    return reminders
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return []
  }
}