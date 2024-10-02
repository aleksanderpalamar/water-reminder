'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const DAILY_GOAL = 3700 // ml

interface WaterCupsDisplayProps {
  userId: string
}

interface Reminder {
  id: string
  containerSize: number
}

export default function WaterCupsDisplay({ userId }: WaterCupsDisplayProps) {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch(`/api/reminders?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setReminders(data.reminders)
        } else {
          console.error('Failed to fetch reminders')
        }
      } catch (error) {
        console.error('Error fetching reminders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReminders()
  }, [userId])

  if (loading) {
    return null // Don't render anything while loading
  }

  if (reminders.length === 0) {
    return null // Don't render if there are no reminders
  }

  const latestReminder = reminders[0] // Assuming reminders are sorted by creation date
  const containerSize = latestReminder.containerSize
  const numberOfCups = Math.ceil(DAILY_GOAL / containerSize)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="flex items-center space-x-2 mb-4">
        <Image
          src="/assets/Cups-of-water.svg"
          alt="Cups of water"
          width={2000}
          height={2000}
          className="h-full w-8 overflow-hidden object-cover"
          priority
          quality={100}
        />
        <span className="text-lg font-medium text-[#5DCCFC]">
          {numberOfCups} x {containerSize}ml
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: numberOfCups }).map((_, index) => (
          <div
            key={index}
            className="w-8 h-8 bg-[#E2E8F0] p-1 rounded-full flex items-center justify-center overflow-hidden"
          >
            <Image
              src="/assets/Cups-of-water.svg"
              alt="Cups of water"
              width={2000}
              height={2000}
              className="h-full w-4 object-cover"
              priority
              quality={100}
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Beba {numberOfCups} copos de {containerSize}ml para atingir sua meta diária de {DAILY_GOAL}ml.
      </p>
    </div>
  )
}