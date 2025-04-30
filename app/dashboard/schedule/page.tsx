'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const instructors = [
  { id: 1, name: "John Doe", expertise: "Forex Fundamentals" },
  { id: 2, name: "Jane Smith", expertise: "Technical Analysis" },
  { id: 3, name: "Mike Johnson", expertise: "Risk Management" },
]

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"
]

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedInstructor, setSelectedInstructor] = useState<string>()
  const [selectedTime, setSelectedTime] = useState<string>()

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Schedule a Live Class</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Instructor</label>
              <Select onValueChange={setSelectedInstructor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id.toString()}>
                      {instructor.name} - {instructor.expertise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Select Time</label>
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" disabled={!selectedDate || !selectedInstructor || !selectedTime}>
              Schedule Class
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

