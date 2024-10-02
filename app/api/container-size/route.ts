import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const latestReminder = await prisma.reminder.findFirst({
      where: { userId },
      orderBy: { reminderTime: 'desc' },
      select: { containerSize: true },
    })

    if (!latestReminder) {
      return NextResponse.json({ error: 'No container size found for this user' }, { status: 404 })
    }

    return NextResponse.json({ containerSize: latestReminder.containerSize })
  } catch (error) {
    console.error('Error fetching container size:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}