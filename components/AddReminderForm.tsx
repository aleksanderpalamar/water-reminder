'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'
import { useServices } from '@/hooks/use-services'


export default function AddReminderForm({ userId }: { userId: string }) {
  const [containerSize, setContainerSize] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const { reminderService, waterIntakeService } = useServices()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await reminderService.addReminder(userId, parseInt(containerSize), reminderTime)
      await waterIntakeService.addWaterIntake(userId, parseInt(containerSize))

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
    <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-lg shadow-md">
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
        <label htmlFor="containerSize" 
        className="block text-sm font-medium text-zinc-50">
          Container Size (ml)
        </label>
        <Input
          type="number"
          id="containerSize"
          placeholder='e.g. "1000"'
          value={containerSize}
          onChange={(e) => setContainerSize(e.target.value)}
          className="mt-1 block w-full rounded-full border-zinc-700 shadow-sm 
          focus:border-sky-400 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reminderTime" 
        className="block text-sm font-medium text-zinc-50">
          Reminder Time
        </label>
        <Input
          type="time"
          id="reminderTime"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="mt-1 block w-full rounded-full border-zinc-700 shadow-sm focus:border-sky-400 
          focus:ring focus:ring-sky-200 focus:ring-opacity-50"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#5DCCFC] text-zinc-800 py-2 px-4 rounded-full hover:bg-sky-400"
      >
        {isSubmitting ? 'Adding...' : 'Add Reminder'}
      </Button>
    </form>
  )
}