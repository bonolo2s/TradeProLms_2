'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from 'lucide-react'
import { link } from "fs"

export default function ComingSoonPage() {
    const router = useRouter()
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Clock className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-600">
              We're working hard to bring you an amazing trading experience
            </p>
            <p className="text-gray-500">
              This feature is currently under development and will include:
            </p>
            <ul className="text-gray-600 space-y-2 max-w-md mx-auto text-left list-none">
              <li className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <span>Advanced trading analytics and insights</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <span>Real-time market data integration</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <span>Customizable trading strategies</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <span>Performance tracking and reporting</span>
              </li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Expected launch: Q2 2024
            </p>
            <Button 
              onClick={() => router.push('/dashboard')} 
              variant="outline" 
              className="mx-auto"
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}