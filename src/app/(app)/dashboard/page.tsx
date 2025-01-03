'use client'
import DashboardContent from '@/components/dashboard/dashboard-content'
import FolderTabs from '@/components/dashboard/folder-tabs'
import { useState } from 'react'

export default function Dashboard() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        margin: '0 auto',
        padding: '16px 100px',
      }}
    >
      <FolderTabs onSelectFolder={setSelectedFolder} />
      <DashboardContent folderId={selectedFolder} />
    </div>
  )
}
