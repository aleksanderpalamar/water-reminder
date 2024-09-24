import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const totalIntake = await prisma.waterIntake.aggregate({
      where: {
        userId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    })

    return NextResponse.json({ waterIntake: totalIntake._sum.amount || 0 })
  } catch (error) {
    console.error('Error fetching water intake:', error)
    return NextResponse.json({ error: 'Failed to fetch water intake' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, amount } = await request.json()

    if (!userId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const existingIntake = await prisma.waterIntake.findFirst({
      where: {
        userId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

    let waterIntake

    if (existingIntake) {
      waterIntake = await prisma.waterIntake.update({
        where: { id: existingIntake.id },
        data: {
          amount: { increment: amount },
        },
      })
    } else {
      waterIntake = await prisma.waterIntake.create({
        data: {
          userId,
          amount,
          date: today,
        },
      })
    }

    return NextResponse.json({ waterIntake: waterIntake.amount })
  } catch (error) {
    console.error('Error updating water intake:', error)
    return NextResponse.json({ error: 'Failed to update water intake' }, { status: 500 })
  }
}