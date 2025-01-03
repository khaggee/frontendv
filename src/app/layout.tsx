import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins, Roboto_Mono } from 'next/font/google'
import './globals.css'
// import './app.css'
import { ThemeProvider } from '@/lib/theme-provider'
import { ToastContainer } from 'react-toastify'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FormBot',
  description: 'A flow form builder for the modern web',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${poppins.className} ${robotoMono.variable} antialiased`}
      >
        <ToastContainer/>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
