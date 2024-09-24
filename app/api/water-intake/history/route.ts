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
    const endDate = new Date()
    endDate.setUTCHours(23, 59, 59, 999)
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - 7)
    startDate.setUTCHours(0, 0, 0, 0)

    const history = await prisma.waterIntake.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
      distinct: ['date'],
    })

    const formattedHistory = history.map((entry) => ({
      date: entry.date.toISOString().split('T')[0],
      amount: entry.amount,
    }))

    return NextResponse.json({ history: formattedHistory })
  } catch (error) {
    console.error('Error fetching water intake history:', error)
    return NextResponse.json({ error: 'Failed to fetch water intake history' }, { status: 500 })
  }
}