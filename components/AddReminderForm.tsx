'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'

export default function AddReminderForm({ userId }: { userId: string }) {
  const [containerSize, setContainerSize] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Create reminder
      const reminderResponse = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          containerSize: parseInt(containerSize),
          reminderTime,
        }),
      })

      if (!reminderResponse.ok) {
        throw new Error('Failed to add reminder')
      }

      // Add water intake
      const waterIntakeResponse = await fetch('/api/water-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount: parseInt(containerSize),
        }),
      })

      if (!waterIntakeResponse.ok) {
        throw new Error('Failed to update water intake')
      }

      setContainerSize('')
      setReminderTime('')
      router.refresh()
    } catch (err) {
      console.error('Error adding reminder or updating water intake:', err)
      setError('Failed to add reminder or update water intake. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <Image 
          src="/assets/Bottle-of-water.svg"
          alt="Botle of water"
          width={2000}
          height={2000}
          className="h-20 w-20 overflow-hidden object-cover"
          priority
          quality={100}
        />
        <p className="text-2xl font-semibold text-[#5DCCFC] mb-4">Add Water Reminder</p>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="containerSize" className="block text-sm font-medium text-gray-700">
          Container Size (ml)
        </label>
        <Input
          type="number"
          id="containerSize"
          placeholder='e.g. "1000"'
          value={containerSize}
          onChange={(e) => setContainerSize(e.target.value)}
          className="mt-1 block w-full rounded-full border-gray-300 shadow-sm 
          focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-700">
          Reminder Time
        </label>
        <Input
          type="time"
          id="reminderTime"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-blue-300 
          focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#5DCCFC] text-white py-2 px-4 rounded-full hover:bg-sky-400
        focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Reminder'}
      </Button>
    </form>
  )
}