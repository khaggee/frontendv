import WorkspaceHeader from '@/components/workspace/layout-header'
import { FormProvider } from '@/providers/FormContextPRovider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workspace',
  description: 'Workspace for the FormBot app',
}

interface AppLayoutProps {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: AppLayoutProps) {
  return (
    <FormProvider>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background)',
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <WorkspaceHeader />
      {children}
    </div>
    </FormProvider>
  )
}
