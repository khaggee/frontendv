'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

interface DeleteFolderModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteFolderModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteFolderModalProps) {
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
        {/* <X
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            cursor: 'pointer',
          }}
          color="var(--danger)"
        /> */}
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          Are you sure you want to delete this folder?
        </h2>
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
            onClick={onConfirm}
          >
            Confirm
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
