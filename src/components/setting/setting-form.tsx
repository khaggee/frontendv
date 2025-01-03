'use client'

import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'
import { getUserDetails, updateUser } from '@/services/user'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'

export default function SettingForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showEmail, setShowEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const handleLogout = () => {
    clearAuth()
    // window.location.href = '/signin'
    router.push('/signin')
  }
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { user } = await getUserDetails() // Fetch user details
        setName(user.username)
        setEmail(user.email)
      } catch (error: any) {
        toast.error('Failed to load user details')
        console.error(error)
      }
    }

    fetchUserDetails()
  }, [])

  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const data = { name, email, password }
      await updateUser(data)
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed')
      console.error(error)
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '10% 0',
        minHeight: '100vh',
        width: '100%',
      }}
     
    >
      <img
        src="/logout.svg"
        alt="logout"
        style={{
          width: '120px',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '5%',
          left: '5%',
        }}
        onClick={handleLogout}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 500,
            textAlign: 'center',
            paddingBottom: '60px',
          }}
        >
          Setting
        </h1>
        <Input
          type="text"
          icon={
            <img
              src="/profile1.svg"
              style={{
                width: '20px',
                height: '20px',
              }}
              alt="Profile"
            />
          }
          style={{
            padding: '18px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 500,
            width: '100%',
            // border: 'none',
          }}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          style={{
            position: 'relative',
          }}
        >
          <img
            src={!showEmail ? '/closeeye.svg' : '/eye.svg'}
            alt="toggle visibility"
            style={{
              width: '28px',
              height: '28px',
              position: 'absolute',
              top: '18px',
              zIndex: 1,
              right: '24px',
              cursor: 'pointer',
            }}
            onClick={() => setShowEmail(!showEmail)}
          />
          <Input
            type={showEmail ? 'text' : 'password'}
            placeholder="Update email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={
              <img
                src="/lock.svg"
                alt="locksvg"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            }
            style={{
              padding: '18px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 500,
              width: '100%',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
          }}
        >
          <img
            src={!showPassword ? '/closeeye.svg' : '/eye.svg'}
            alt="toggle visibility"
            style={{
              width: '28px',
              height: '28px',
              position: 'absolute',
              top: '18px',
              zIndex: 1,
              right: '24px',
              cursor: 'pointer',
            }}
            onClick={() => setShowPassword(!showPassword)}
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <img
                src="/lock.svg"
                alt="locksvg"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            }
            style={{
              padding: '18px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 500,
              width: '100%',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
          }}
        >
          <img
            src={!showConfirmPassword ? '/closeeye.svg' : '/eye.svg'}
            alt="toggle visibility"
            style={{
              width: '28px',
              height: '28px',
              position: 'absolute',
              top: '18px',
              zIndex: 1,
              right: '24px',
              cursor: 'pointer',
            }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={
              <img
                src="/lock.svg"
                alt="locksvg"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              />
            }
            style={{
              padding: '18px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 500,
              width: '100%',
            }}
          />
        </div>
        <Button
        onClick={handleUpdate}
          style={{
            padding: '18px 24px',
            borderRadius: '100px',
            marginTop: '16px',
          }}
        >
          Update
        </Button>
      </div>
    </div>
  )
}
