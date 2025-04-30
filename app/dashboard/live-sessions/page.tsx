'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from 'lucide-react'
import Link from 'next/link'

// Mock data for live sessions
const liveSessions = [
  {
    id: 1,
    title: "Forex Fundamentals",
    instructor: "John Doe",
    date: "2025-01-15T14:00:00Z",
    duration: 60,
    attendees: 25,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Technical Analysis Masterclass",
    instructor: "Jane Smith",
    date: "2025-01-16T18:30:00Z",
    duration: 90,
    attendees: 40,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Risk Management Strategies",
    instructor: "Mike Johnson",
    date: "2025-01-14T10:00:00Z",
    duration: 75,
    attendees: 30,
    status: "ongoing"
  },
  {
    id: 4,
    title: "Trading Psychology",
    instructor: "Sarah Williams",
    date: "2025-01-13T16:00:00Z",
    duration: 60,
    attendees: 35,
    status: "completed"
  }
]

export default function LiveSessionsPage() {
  const [sessions, setSessions] = useState(liveSessions)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500'
      case 'ongoing':
        return 'bg-green-500'
      case 'completed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Live Sessions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{session.title}</CardTitle>
                <Badge className={`${getStatusColor(session.status)} text-white`}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </Badge>
              </div>
              <CardDescription>{session.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{formatDate(session.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{session.duration} minutes</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{session.attendees} attendees</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?u=${session.instructor}`} />
                <AvatarFallback>{session.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {session.status === 'ongoing' ? (
                <Button asChild>
                  <Link href={`dashboard/live-class/${session.id}`}>Join Now</Link>
                </Button>
              ) : (
                <Button 
                  variant={session.status === 'upcoming' ? 'default' : 'secondary'}
                  disabled={session.status === 'completed'}
                >
                  {session.status === 'upcoming' ? 'Set Reminder' : 'View Recording'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

