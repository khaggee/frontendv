import DashboardHeader from '@/components/dashboard/layout-header'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: AppLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background)',
      }}
    >
      <DashboardHeader />
      {children}
    </div>
  )
}
