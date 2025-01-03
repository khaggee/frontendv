'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { X } from 'lucide-react'

interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [email, setEmail] = useState('')
  const [link, setLink] = useState('https://example.com/invite-link')
  const modalRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      //@ts-ignore
      if (modalRef.current && !modalRef.current?.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--secondary)',
          padding: '24px 32px',
          borderRadius: '24px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <X
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            cursor: 'pointer',
          }}
          color="var(--danger)"
        />
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          Invite by Email
        </h2>
        <Input
          type="email"
          placeholder="Enter email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '18px 24px',
            margin: '8px 0',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 500,
            border: 'none',
          }}
        />
        <Button
          style={{
            width: '100%',
            padding: '18px 24px',
            margin: '8px 0',
            borderRadius: '12px',
          }}
          onClick={() => alert(`Invite sent to ${email}`)}
        >
          Invite
        </Button>

        <h2
          style={{
            fontSize: '24px',
            fontWeight: 500,
            marginTop: '16px',
          }}
        >
          Invite by Link
        </h2>
        <Input
          type="text"
          value={link}
          readOnly
          style={{
            width: '100%',
            fontSize: '16px',
            fontWeight: 500,
            padding: '18px 24px',
            margin: '8px 0',
            borderRadius: '12px',
            border: 'none',
          }}
        />
        <Button
          style={{
            width: '100%',
            padding: '18px 24px',
            margin: '8px 0',
            borderRadius: '12px',
          }}
          onClick={() => navigator.clipboard.writeText(link)}
        >
          Copy Link
        </Button>
      </div>
    </motion.div>
  )
}
