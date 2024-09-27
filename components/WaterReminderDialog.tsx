'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from 'next/image'

interface WaterReminderDialogProps {
  isOpen: boolean
  containerSize: number
}

export function WaterReminderDialog({ isOpen, containerSize }: WaterReminderDialogProps) {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-2">
            <Image
              src="/assets/Bottle-of-water-woman.svg"
              alt="Bottle of water"
              width={2000}
              height={2000}
              className="h-28 w-28 overflow-hidden object-cover"
              priority
              quality={100}
            />
            <span className="text-[#5DCCFC] font-bold text-lg">Water Reminder</span>
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500 dark:text-gray-400">
            Beba água e se mantenha hidratado, para uma boa saúde!
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-lg font-semibold text-[#5DCCFC]">
            Beba {containerSize}ml de 3700ml
          </p>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}