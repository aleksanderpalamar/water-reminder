import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const date = new Date().toISOString().split('T')[0] // Get current date

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const waterIntakes = await prisma.waterIntake.findMany({
      where: {
        userId,
        date: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

    const totalIntake = waterIntakes.reduce((sum, intake) => sum + intake.amount, 0)

    return NextResponse.json({ waterIntake: totalIntake })
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

    await prisma.waterIntake.create({
      data: {
        userId,
        amount,
      },
    })

    // Fetch total water intake for the day after adding new entry
    const date = new Date().toISOString().split('T')[0]
    const totalIntake = await prisma.waterIntake.aggregate({
      where: {
        userId,
        date: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    })

    return NextResponse.json({ waterIntake: totalIntake._sum.amount || 0 })
  } catch (error) {
    console.error('Error updating water intake:', error)
    return NextResponse.json({ error: 'Failed to update water intake' }, { status: 500 })
  }
}