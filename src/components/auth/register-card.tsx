'use client'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import { register, validateToken } from '@/services/auth'

export default function RegisterCard(props: {
  setIsRegister: (isRegister: boolean) => void
}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const setToken = useAuthStore((state) => state.setToken)
  const router = useRouter()


  const token = useAuthStore((state) => state.token)
  const clearToken = useAuthStore((state) => state.clearAuth)
  const setUsernamee = useAuthStore((state) => state.setUsername)
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



  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const data = await register({ username, email, password })
      setToken(data.token) 
      localStorage.setItem('token', data.token) 
      setUsernamee(data.user.username)
      toast.success('Registration successful!')
      router.push('/dashboard')

      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
      console.error(error)
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
        gap: '1rem',
      }}
    >
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%' }}
        containerstyle={{ width: '100%' }}
      />
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
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ width: '100%' }}
        containerstyle={{ width: '100%' }}
      />
      <div
        style={{
          width: '100%',
        }}
      >
        <Button
          onClick={handleRegister}
          style={{
            width: '100%',
          }}
        >
          Register
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
          Sign Up with Google
        </Button>
        <p
          style={{
            margin: '1rem 0',
            textAlign: 'center',
          }}
        >
          Already have an account?{' '}
          <button
            onClick={() => props.setIsRegister(false)}
            style={{ color: 'var(--link)' }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}
