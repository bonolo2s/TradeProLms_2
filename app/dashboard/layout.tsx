"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BookOpen, Calendar, Layout, LineChart, User, Video, Settings } from "lucide-react"

// Mock function to check if user is admin - replace with actual auth logic
const isAdmin = () => {
  // This should be replaced with actual admin check logic
  return true // For demonstration purposes, always return true
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [title, setTitle] = useState("Dashboard")

  const isActive = (path: string) => pathname === path

  const menuItems = [
    { name: "Dashboard", icon: Layout, href: "/dashboard" },
    { name: "Live Sessions", icon: Video, href: "/dashboard/live-sessions" },
    { name: "Schedule Sessions", icon: Calendar, href: "/dashboard/schedule" },
    { name: "Trading Simulator", icon: LineChart, href: "/dashboard/simulator" },
    { name: "Journal", icon: BookOpen, href: "/dashboard/journal" },
    { name: "Availability", icon: Calendar, href: "/dashboard/availability" },
  ]

  const adminItems = [{ name: "Schedule Live Class", icon: Settings, href: "dashboard/admin/schedule-class" }]//i specied to say go to root folder and look for this

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md flex flex-col">
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-800">TradePro LMS</h2>
            </div>
            <nav className="mt-6 flex-grow">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    pathname === item.href ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setTitle(item.name)}
                >
                  <item.icon className="mr-3" />
                  {item.name}
                </Link>
              ))}
              {isAdmin() && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Admin</div>
                  {adminItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                        pathname === item.href ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setTitle(item.name)}
                    >
                      <item.icon className="mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>
            <hr />
            <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
              <User className="mr-3" />
              Profile
            </Link>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            {/* Header */}
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
            </header>

            {/* Page Content */}
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

