"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ScheduleClassPage() {
  const [classDetails, setClassDetails] = useState({
    title: "",
    instructor: "",
    date: "",
    startTime: "",
    duration: "",
    description: "",
    maxAttendees: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Class scheduled:", classDetails)
    // Here you would typically send this data to your backend
    // and update the live sessions and schedule
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Schedule a Live Class</h1>

      <Card>
        <CardHeader>
          <CardTitle>Class Details</CardTitle>
          <CardDescription>Enter the details for the new live class</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Class Title</Label>
                <Input
                  id="title"
                  value={classDetails.title}
                  onChange={(e) => setClassDetails((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={classDetails.instructor}
                  onChange={(e) => setClassDetails((prev) => ({ ...prev, instructor: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={classDetails.date}
                  onChange={(e) => setClassDetails((prev) => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={classDetails.startTime}
                  onChange={(e) => setClassDetails((prev) => ({ ...prev, startTime: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={classDetails.duration}
                  onChange={(e) => setClassDetails((prev) => ({ ...prev, duration: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={classDetails.maxAttendees}
                  onChange={(e) => setClassDetails((prev) => ({ ...prev, maxAttendees: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Class Description</Label>
              <Textarea
                id="description"
                value={classDetails.description}
                onChange={(e) => setClassDetails((prev) => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>
            <Button type="submit">Schedule Class</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

