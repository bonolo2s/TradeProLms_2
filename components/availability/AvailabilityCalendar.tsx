'use client'

import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {format} from 'date-fns/format'
import {parse} from 'date-fns/parse'
import {startOfWeek} from 'date-fns/startOfWeek'
import {getDay} from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Sample availability data
const availabilityEvents = [
  {
    title: 'Available',
    start: new Date(2025, 0, 13, 10, 0), // January 13, 2025, 10:00 AM
    end: new Date(2025, 0, 13, 12, 0),   // January 13, 2025, 12:00 PM
  },
  {
    title: 'Available',
    start: new Date(2025, 0, 15, 14, 0), // January 15, 2025, 2:00 PM
    end: new Date(2025, 0, 15, 16, 0),   // January 15, 2025, 4:00 PM
  },
  // Add more availability slots as needed
]

export default function AvailabilityCalendar() {
  const [events] = useState(availabilityEvents)

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100%' }}
    />
  )
}

