'use client'

import { useState, useEffect } from 'react'

interface WaterIntake {
  date: string
  amount: number
}

const DAILY_GOAL = 3700 // ml

export default function WaterIntakeHistory({ userId }: { userId: string }) {
  const [history, setHistory] = useState<WaterIntake[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/water-intake/history?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch water intake history')
        }
        const data = await response.json()
        setHistory(data.history)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching water intake history:', err)
        setError('Failed to load water intake history. Please try again later.')
        setLoading(false)
      }
    }

    fetchHistory()
  }, [userId])

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading water intake history...</div>
  }

  if (error) {
    return <div className="bg-white p-6 rounded-lg shadow-md text-red-500">{error}</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry) => (
            <li key={entry.date} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{new Date(entry.date).toLocaleDateString()}</span>
                <span className="text-blue-600">{entry.amount} ml / {DAILY_GOAL} ml</span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${Math.min((entry.amount / DAILY_GOAL) * 100, 100)}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}