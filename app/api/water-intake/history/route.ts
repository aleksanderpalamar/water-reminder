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
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - 7) // Get data for the last 7 days

    const history = await prisma.waterIntake.groupBy({
      by: ['date'],
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    const formattedHistory = history.map((entry) => ({
      date: entry.date.toISOString().split('T')[0],
      amount: entry._sum.amount || 0,
    }))

    return NextResponse.json({ history: formattedHistory })
  } catch (error) {
    console.error('Error fetching water intake history:', error)
    return NextResponse.json({ error: 'Failed to fetch water intake history' }, { status: 500 })
  }
}