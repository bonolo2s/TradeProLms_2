import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Calendar, DollarSign, Video, LineChart } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Upcoming Live Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Live Sessions</CardTitle>
          <CardDescription>Your scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Forex Fundamentals</h3>
                <p className="text-xs text-gray-500">Today, 2:00 PM</p>
              </div>
              <Button size="sm">Join</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Technical Analysis</h3>
                <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
              <Button size="sm" variant="outline">Remind</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">Risk Management</h3>
                <p className="text-xs text-gray-500">Jan 15, 3:00 PM</p>
              </div>
              <Button size="sm" variant="outline">Remind</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule a Session */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Session</CardTitle>
          <CardDescription>Book your next class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="mb-4">Choose a time slot for your next one-on-one session.</p>
            <Button>View Available Slots</Button>
          </div>
        </CardContent>
      </Card>

      {/* Trading Simulator */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Simulator</CardTitle>
          <CardDescription>Practice your skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <BarChart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="mb-4">Test your trading strategies without risking real money.</p>
            <Button>Launch Simulator</Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Your trading stats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm font-medium">Profit/Loss: +$1,250</span>
            </div>
            <div className="flex items-center">
              <Video className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Attended Sessions: 8</span>
            </div>
            <div className="flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-purple-500" />
              <span className="text-sm font-medium">Successful Trades: 68%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}