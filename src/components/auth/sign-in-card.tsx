'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FcGoogle } from 'react-icons/fc'
import { redirect, useRouter } from 'next/navigation'
import useAuthStore from '@/store/useAuthStore'
import { toast } from 'react-toastify'
import { login, validateToken } from '@/services/auth'

export default function SignInCard(props: {
  setIsRegister: (isRegister: boolean) => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const token = useAuthStore((state) => state.token)
  const setToken = useAuthStore((state) => state.setToken)
  const clearToken = useAuthStore((state) => state.clearAuth)
  const setUsername = useAuthStore((state) => state.setUsername)
  
  useEffect(() => {
    // console.log(token)
    const checkToken = async () => {
      if (token) {
        try {
          const isValid = await validateToken(token)
          if (isValid) {
            router.replace('/dashboard') // Redirect to dashboard
          } else {
            clearToken() // Clear invalid token from Zustand
            localStorage.removeItem('token') // Remove token from localStorage
          }
        } catch (error) {
          console.error('Token validation failed:', error)
          clearToken() // Ensure the token is cleared on failure
          localStorage.removeItem('token')
        }
      }
    }

    checkToken()
  }, [token, router, clearToken]) // Dependency array includes `token`

  
  const handleSignIn = async () => {
    try {
      const data = await login({ email, password })
      setToken(data.token)
      setUsername(data.user.username) // Save username in Zustand

      // localStorage.setItem('token', data.token) 
      toast.success('Login successful!')
      router.replace('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed')
      // console.error(error)
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        gap: '2rem',
      }}
    >
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%' }}
        containerstyle={{ width: '100%' }}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%' }}
        containerstyle={{ width: '100%' }}
      />
      <div
        style={{
          width: '100%',
        }}
      >
        <Button
          onClick={handleSignIn}
          style={{
            width: '100%',
          }}
        >
          Log In
        </Button>
        <p
          style={{
            margin: '1rem 0',
            textAlign: 'center',
          }}
          className="small"
        >
          or
        </p>
        <Button
          style={{
            width: '100%',
            position: 'relative',
          }}
        >
          <FcGoogle
            style={{
              padding: '2px',
              borderRadius: '100%',
              backgroundColor: 'white',
              position: 'absolute',
              left: '10',
              top: '50%',
            }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2  "
            size={28}
          />
          Sign In with Google
        </Button>
        <p
          style={{
            margin: '1rem 0',
            textAlign: 'center',
          }}
          className="text-sm"
        >
          Don't have an account?{' '}
          <button
            onClick={() => props.setIsRegister(true)}
            style={{ color: 'var(--link)' }}
          >
            Register Now
          </button>
        </p>
      </div>
    </div>
  )
}
