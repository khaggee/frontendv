'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { redirect, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import ThemeToggle from '../theme-toggle'
import { ArrowBigDown, ArrowDown } from 'lucide-react'
import InviteModal from './invite-modal'
import useAuthStore from '@/store/useAuthStore'

export default function DashboardHeader() {
  const [open, setOpen] = useState(false)
  const [isInviteModalOpen, setInviteModalOpen] = useState(false)
  const username = useAuthStore((state) => state.username)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const handleLogout = () => {
    clearAuth()
    redirect('/signin')
  }
  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'end',
        padding: '8px 16px',
        height: '64px',
        gap: '16px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <motion.div
        initial={{
          height: 44,
        }}
        animate={{
          height: open ? 'auto' : 44,
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          overflow: 'hidden',
          display: 'flex',
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'column',
          backgroundColor: 'var(--secondary)',
          width: '300px',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '44px',
              textAlign: 'left',
              paddingLeft: '16px',
            }}
            onClick={() => {
              setOpen(!open)
            }}
          >
            {username}'s workspace
            <ArrowDown
              size={16}
              style={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>
          <button
            style={{
              height: '44px',
              textAlign: 'left',
              paddingLeft: '16px',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
            onClick={() => {
              setOpen(false)
              router.push('/setting')
            }}
          >
            Setting
          </button>
          <button
            style={{
              height: '44px',
              textAlign: 'left',
              paddingLeft: '16px',
              color: '#FFA54C',
            }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </motion.div>

      <ThemeToggle />
      <Button onClick={() => setInviteModalOpen(true)}>Share</Button>
      <AnimatePresence>
        <InviteModal
          isOpen={isInviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
        />
      </AnimatePresence>
    </div>
  )
}
