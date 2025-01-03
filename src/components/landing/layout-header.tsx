'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import useAuthStore from '@/store/useAuthStore'

export default function LandingHeader() {
  const router = useRouter()
  const token = useAuthStore((state) => state.token) // Get token from Zustand store
  const username = useAuthStore((state) => state.username) // Get username from Zustand store
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '30px 100px',
      }}
    >
      <div>
        <img
          src="/mainlogo.svg"
          alt="Logo"
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          gap: '0.5rem',
        }}
      >
        {!token ? (
          <>
            <Button
              onClick={() => {
                router.push('/signin')
              }}
              style={{
                borderRadius: '8px',
                border: '1px solid #7EA6FF',
                backgroundColor: 'transparent',
                color: '#7EA6FF',
              }}
            >
              Sign in
            </Button>
          
          </>
        ) : (
          <Button
            onClick={() => {
              router.push('/dashboard')
            }}
            style={{
              borderRadius: '8px',
            }}
          >
            {username}'s Dashboard
          </Button>
          
        )}
         <Button
              onClick={() => {
                router.push('/signin')
              }}
              style={{
                borderRadius: '8px',
              }}
            >
              Create a Form
            </Button>
      </div>
    </div>
  )
}
