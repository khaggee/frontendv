'use client'

import SignInCard from '@/components/auth/sign-in-card'
import RegisterCard from '@/components/auth/register-card'
import ThemeToggle from '@/components/theme-toggle'
import { useState } from 'react'

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        // backgroundColor: 'hsl(var(--background2))',
        backgroundColor: 'var(--background2)',

        color: 'hsl(var(--foreground))',
        position: 'relative',
      }}
    >
      {isRegister ? (
        <RegisterCard setIsRegister={setIsRegister} />
      ) : (
        <SignInCard setIsRegister={setIsRegister} />
      )}

      <div
        style={{
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '15%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg
            width="364"
            height="359"
            viewBox="0 0 364 359"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M124.344 79.9593C125.031 75.3919 130.405 73.2809 134.017 76.1595L293.259 203.069C296.871 205.947 296.012 211.657 291.713 213.345L102.186 287.798C97.8866 289.487 93.3716 285.889 94.0585 281.322L124.344 79.9593Z"
              fill="#E67200"
            />
            <path
              d="M141.517 57.6497C142.204 53.0823 147.578 50.9713 151.19 53.85L310.432 180.759C314.044 183.638 313.185 189.347 308.886 191.036L119.358 265.489C115.059 267.178 110.544 263.579 111.231 259.012L141.517 57.6497Z"
              fill="#FF8B1A"
            />
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '0%',
          }}
        >
          <svg
            width="115"
            height="229"
            viewBox="0 0 115 229"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M114.5 229C84.1327 229 55.0092 216.937 33.5363 195.464C12.0633 173.991 -6.33235e-06 144.867 -5.00495e-06 114.5C-3.67756e-06 84.1327 12.0634 55.0092 33.5363 33.5363C55.0092 12.0634 84.1327 -1.74702e-06 114.5 -5.00495e-06L114.5 114.5L114.5 229Z"
              fill="#FF9595"
            />
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0%',
            left: '69%',
          }}
        >
          <svg
            width="229"
            height="115"
            viewBox="0 0 229 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M229 114.5C229 99.4636 226.038 84.5745 220.284 70.6827C214.53 56.791 206.096 44.1686 195.464 33.5363C184.831 22.904 172.209 14.47 158.317 8.71579C144.425 2.96163 129.536 -6.5726e-07 114.5 0C99.4636 6.5726e-07 84.5745 2.96163 70.6827 8.7158C56.791 14.47 44.1686 22.904 33.5363 33.5363C22.904 44.1686 14.47 56.791 8.71579 70.6828C2.96163 84.5745 -1.31452e-06 99.4637 0 114.5L114.5 114.5H229Z"
              fill="#FFBF7D"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
