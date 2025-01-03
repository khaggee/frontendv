'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { X } from 'lucide-react'
import { Form } from './dashboard-content'

interface CreateFormModalProps {
  isOpen: boolean
  onClose: () => void
  handleCreateForm: (form: { name: string }) => void
}

export default function CreateFormModal({
  isOpen,
  onClose,
  handleCreateForm,
}: CreateFormModalProps) {
  const [folderName, setFolderName] = useState('')
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
          Create New Form
        </h2>
        <Input
          type="text"
          placeholder="Enter form name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 0',
          }}
        >
          <Button
            style={{
              width: '100%',
              padding: '18px 24px',
              backgroundColor: 'transparent',
              fontWeight: 500,
              fontSize: '18px',

              border: 'none',
              borderRadius: '0',
              color: 'var(--button)',
            }}
            onClick={() => {
              handleCreateForm({ name: folderName })
              onClose()
            }}
          >
            Done
          </Button>
          <Button
            style={{
              width: '100%',
              padding: '18px 24px',
              backgroundColor: 'transparent',
              fontWeight: 500,
              fontSize: '18px',
              color: 'var(--primary)',

              border: 'none',
              borderRadius: '0',
              borderLeft: '1px solid var(--border)',
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
