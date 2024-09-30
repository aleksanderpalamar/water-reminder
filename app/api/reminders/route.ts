import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const reminders = await prisma.reminder.findMany({
      where: { userId },
    })
    return NextResponse.json({ reminders })
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, containerSize, reminderTime } = await request.json()

    if (!userId || !containerSize || !reminderTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const reminder = await prisma.reminder.create({
      data: {
        userId,
        containerSize,
        reminderTime,
      },
    })

    return NextResponse.json({ reminder })
  } catch (error) {
    console.error('Error creating reminder:', error)
    return NextResponse.json({ error: 'Failed to create reminder' }, { status: 500 })
  }
}