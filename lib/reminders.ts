import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getReminders(userId: string) {
  try {
    const reminders = await prisma.reminder.findMany({
      where: { userId },
      orderBy: { reminderTime: 'desc' },
    })
    return reminders
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return []
  }
}