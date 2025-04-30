'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, Video, VideoOff, MessageSquare, Users, Share2, MoreVertical } from 'lucide-react'

// Mock data for the live class
const mockClassData = {
  id: '1',
  title: 'Advanced Forex Trading Strategies',
  instructor: 'Jane Doe',
  participants: [
    { id: '1', name: 'Jane Doe', role: 'instructor' },
    { id: '2', name: 'John Smith', role: 'student' },
    { id: '3', name: 'Alice Johnson', role: 'student' },
    { id: '4', name: 'Bob Williams', role: 'student' },
  ],
}

export default function LiveClassPage() {
  const params = useParams()
  const [classData, setClassData] = useState(mockClassData)
  const [messages, setMessages] = useState([
    { sender: 'Jane Doe', content: 'Welcome to the Advanced Forex Trading Strategies class!' },
    { sender: 'John Smith', content: 'Excited to learn about new strategies!' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  useEffect(() => {
    // In a real application, fetch the class data using the ID from params
    console.log('Fetching class data for ID:', params.id)
  }, [params.id])

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', content: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-semibold">{classData.title}</h1>
        <p className="text-sm text-gray-500">Instructor: {classData.instructor}</p>
      </header>

      <div className="flex-grow flex overflow-hidden">
        <div className="flex-grow flex flex-col">
          <div className="flex-grow bg-gray-900 relative">
            {/* Main video area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-2xl">Main Video Feed</p>
            </div>
            {/* Participant videos */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {classData.participants.slice(0, 4).map((participant) => (
                <div key={participant.id} className="w-32 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-white text-xs">{participant.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-100 p-4 flex justify-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff /> : <Video />}
            </Button>
            <Button variant="outline" size="icon">
              <Share2 />
            </Button>
            <Button variant="destructive">
              Leave Class
            </Button>
          </div>
        </div>

        <div className="w-80 bg-white border-l">
          <Tabs defaultValue="chat">
            <TabsList className="w-full">
              <TabsTrigger value="chat" className="w-1/2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="participants" className="w-1/2">
                <Users className="w-4 h-4 mr-2" />
                Participants
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="p-4">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                {messages.map((message, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{message.sender}</p>
                    <p>{message.content}</p>
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-4 flex">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-grow"
                />
                <Button onClick={sendMessage} className="ml-2">Send</Button>
              </div>
            </TabsContent>
            <TabsContent value="participants" className="p-4">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                {classData.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center mb-4">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`https://i.pravatar.cc/32?u=${participant.id}`} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{participant.name}</span>
                    {participant.role === 'instructor' && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                        Instructor
                      </span>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

