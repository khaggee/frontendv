'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Route } from 'next'
import { Input } from '../ui/input'
import ThemeToggle from '../theme-toggle'
import { useFormContext } from '@/providers/FormContextPRovider'

export default function WorkspaceHeader() {
  const pathname = usePathname()
  const path = pathname.split('/').pop()
  const router = useRouter()
  
  const handleChange = (title: Route) => {
    if (title === 'flow') {
      router.push('/workspace/flow')
    } else {
      router.push('/workspace/response')
    }
  }

  const { saveForm } = useFormContext();

  const handleSave = () => saveForm('New Form', 'Form Description');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        height: '64px',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Input placeholder="Search" />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '16px',
        }}
      >
        {['Flow', 'Response'].map((title) => (
          <Button
            key={title}
            style={{
              backgroundColor: 'transparent',
              border:
                path === title.toLocaleLowerCase()
                  ? '2px solid var(--link2)'
                  : 'none',
              color:
                path === title.toLocaleLowerCase()
                  ? 'var(--link2)'
                  : 'var(--primary)',
            }}
            onClick={() => handleChange(title.toLocaleLowerCase())}
          >
            {title}
          </Button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
        }}
      >
        <ThemeToggle />
        <Button
          style={{
            backgroundColor: 'var(--secondary)',
            border: 'none',
            padding: '0.5rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
          }}
          // onClick={() => router.push('/workspace/create')}
        >
          Share
        </Button>
        <Button
          style={{
            backgroundColor: 'var(--accept)',
            border: 'none',
            padding: '0.5rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
          }}
          onClick={handleSave}
          // onClick={() => router.push('/workspace/create')}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
