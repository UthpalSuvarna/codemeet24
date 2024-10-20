"use client"
import { useState } from 'react'
import { format, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Smile, Meh, Frown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

// Mock data for demonstration
const user = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
  joinDate: '2024-10-1',
}

const moodData = {
  '2024-10-01': 'happy',
  '2024-10-03': 'neutral',
  '2024-10-05': 'sad',
  '2023-05-10': 'happy',
  '2023-05-15': 'neutral',
  '2024-10-5': 'sad',
  // Add more dates as needed
}

const moodColors = {
  happy: 'bg-green-500',
  neutral: 'bg-yellow-500',
  sad: 'bg-red-500',
}

const moodIcons = {
  happy: <Smile className="w-4 h-4" />,
  neutral: <Meh className="w-4 h-4" />,
  sad: <Frown className="w-4 h-4" />,
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = []
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d))
    }

    return days
  }

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const handleDateClick = (date: Date) => setSelectedDate(date)

  const getMoodForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    return moodData[dateString] || null
  }

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth)
    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-sm py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const mood = getMoodForDate(day)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = selectedDate && isSameDay(day, selectedDate)

          return (
            <Button
              key={index}
              variant="outline"
              className={`h-16 p-1 flex flex-col items-center justify-between ${isCurrentMonth ? 'opacity-100' : 'opacity-50'
                } ${isSelected ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <span className="text-sm font-semibold">{format(day, 'd')}</span>
              {mood && <div className={`w-4 h-4 rounded-full ${moodColors[mood]}`} />}
            </Button>
          )
        })}
      </div>
    )
  }

  const renderMoodSummary = () => {
    if (!selectedDate) {
      return <p className="text-muted-foreground">Please select a date on the calendar.</p>
    }

    const mood = getMoodForDate(selectedDate)

    if (!mood) {
      return <p className="text-muted-foreground">No mood data for this date.</p>
    }

    return (

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-lg py-1 px-2">
          {moodIcons[mood]}
          <span className="ml-1 capitalize">{mood}</span>
        </Badge>
        <p>You were feeling {mood} on this day.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6 pt-20">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? ""} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{session?.user.name}</CardTitle>
            <CardDescription>{session?.user.email}</CardDescription>
            {/* <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <CalendarIcon className="w-4 h-4 mr-1" />
              Joined {format(new Date(user.joinDate), 'MMMM yyyy')}
            </div> */}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Mood Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </div>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {renderCalendar()}
          <div className="mt-4 flex justify-center gap-4">
            {Object.entries(moodColors).map(([mood, color]) => (
              <div key={mood} className="flex items-center gap-1">
                <div className={`w-4 h-4 rounded-full ${color}`} />
                <span className="text-sm capitalize">{mood}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Summary</CardTitle>
          <CardDescription>
            {selectedDate
              ? `Your mood on ${format(selectedDate, 'MMMM d, yyyy')}`
              : 'Select a date to view mood'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderMoodSummary()}
        </CardContent>
      </Card>
    </div>
  )
}