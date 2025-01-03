'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: 700,
      }}
    >
      Light
      <div
        className="theme-toggle-container"
        style={{
          backgroundColor:
            theme === 'light' ? 'var(--background)' : 'var(--button)',
          border: theme === 'dark' ? 'none' : '1px solid var(--border)',
        }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <motion.div
          animate={{
            x: theme === 'light' ? 3 : '2.25rem',
            backgroundColor: theme === 'light' ? 'black' : 'white',
          }}
          transition={{ duration: 0.1 }}
          className={`theme-toggle-slider `}
        >
          {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '1000%',
            backgroundColor: theme === 'light' ? 'var(--background)' : 'white',
            boxShadow: '0 0 0 1px var(--border)',
            transition: 'background-color 0.1s ease',
            }}
            /> */}
        </motion.div>
      </div>
      Dark
    </div>
  )
}
