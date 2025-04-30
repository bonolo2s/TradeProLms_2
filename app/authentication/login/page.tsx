'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Demo credentials
  const DEMO_USER = {
    email: 'nolo@nexus.com',
    password: 'nolo'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo authentication logic
    if (formData.email === DEMO_USER.email && formData.password === DEMO_USER.password) {
      // In a real app, you'd:
      // 1. Store the token in localStorage or cookies
      // 2. Set up an auth context
      // 3. Handle proper session management
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/dashboard')
    } else {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Demo credentials:<br />
        Email: nolo@nexus.com<br />
        Password: nolo
      </div>

      <p className="text-center text-sm">
        Don't have an account?{' '}
        <Link href="/authentication/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  )
}