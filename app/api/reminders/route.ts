import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId,
        date: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
        },
      },
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

    // First, ensure the user exists
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    })

    // Now create the reminder
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