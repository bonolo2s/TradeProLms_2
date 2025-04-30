'use client'

import AvailabilityCalendar from '@/components/availability/AvailabilityCalendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AvailabilityPage() {
  return (
    <div className="p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Instructor Availability</CardTitle>
          <CardDescription>View available time slots for booking sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <AvailabilityCalendar />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

