'use client'

import { useState, useEffect } from 'react'

const DAILY_GOAL = 3700 // ml

export default function WaterIntakeDisplay({ userId }: { userId: string }) {
  const [waterIntake, setWaterIntake] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWaterIntake = async () => {
      try {
        const response = await fetch(`/api/water-intake?userId=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch water intake')
        }
        const data = await response.json()
        setWaterIntake(data.waterIntake || 0) // Ensure we always have a number
        setLoading(false)
      } catch (err) {
        console.error('Error fetching water intake:', err)
        setError('Failed to load water intake. Please try again later.')
        setLoading(false)
      }
    }

    fetchWaterIntake()
    // Set up an interval to fetch water intake every minute (for testing purposes)
    const intervalId = setInterval(fetchWaterIntake, 60 * 1000)

    return () => clearInterval(intervalId)
  }, [userId])

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow-md mb-8">Loading water intake...</div>
  }

  if (error) {
    return <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-red-500">{error}</div>
  }

  const percentage = Math.min((waterIntake / DAILY_GOAL) * 100, 100)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 overflow-hidden">
      <h2 className="text-2xl font-semibold text-[#5DCCFC] mb-4">Today&apos;s Water Intake</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#5DCCFC] bg-[#E2E8F0]">
              {waterIntake} ml / {DAILY_GOAL} ml
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-sky-500">
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#E2E8F0]">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#5DCCFC]"
          ></div>
        </div>
      </div>
    </div>
  )
}