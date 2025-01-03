'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ImBin } from 'react-icons/im'
import { useTheme } from 'next-themes'
import CreateFolderModal from './create-folder-modal'
import DeleteFolderModal from './delete-folder-modal'
import axiosInstance from '@/services/axiosInstance'

export default function FolderTabs({ onSelectFolder }: { onSelectFolder: (folderId: string | null) => void }) {
  const theme: any = useTheme()
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)
  const [isDeleteFolderModalOpen, setDeleteFolderModalOpen] = useState(false)
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null)
  const [folders, setFolders] = useState<{ _id: string; name: string }[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  // Fetch folders on component mount
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axiosInstance.get('/api/folders')
        setFolders(response.data.folders)
        if (response.data.folders.length > 0) {
          setSelectedFolder(response.data.folders[0]._id) // Auto-select the first folder
          onSelectFolder(response.data.folders[0]._id)
        }
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }

    fetchFolders()
  }, [])

  const handleCreate = async (name: string) => {
    try {
      const response = await axiosInstance.post('/api/folders', { name })
      setFolders([...folders, response.data.folder])
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  const handleDelete = (id: string) => {
    setFolderToDelete(id)
    setDeleteFolderModalOpen(true)
  }

  const confirmDelete = async () => {
    if (folderToDelete) {
      try {
        await axiosInstance.delete(`/api/folders/${folderToDelete}`)
        setFolders(folders.filter((folder) => folder._id !== folderToDelete))
        setFolderToDelete(null)
        setDeleteFolderModalOpen(false)
      } catch (error) {
        console.error('Error deleting folder:', error)
      }
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '16px',
      }}
    >
      <CreateFolderModal
        onConfirm={handleCreate}
        isOpen={isCreateFolderModalOpen}
        onClose={() => setCreateFolderModalOpen(false)}
      />
      <DeleteFolderModal
        isOpen={isDeleteFolderModalOpen}
        onClose={() => setDeleteFolderModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <Button
        onClick={() => setCreateFolderModalOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--button2)',
          borderRadius: '8px',
          width: 'fit-content',
          color: 'var(--primary)',
        }}
      >
        <img
          src="/createfolder.svg"
          alt="Folder"
          style={{
            filter: theme !== 'dark' ? 'invert(1)' : 'invert(0)',
          }}
        />
        Create Folder
      </Button>
      {folders.map((folder) => (
        <Button
          key={folder._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: selectedFolder === folder._id ? 'var(--selected-folder)' : 'var(--button2)',
            borderRadius: '8px',
            color: 'var(--primary)',
            border: selectedFolder === folder._id ? '2px solid var(--highlight-color)' : 'none',
          }}
          onClick={() => {
            setSelectedFolder(folder._id)
            onSelectFolder(folder._id)
          }}
        >
          {folder.name}
          <a
            className="p-1"
            onClick={(e) => {
              e.stopPropagation() // Prevent folder selection when deleting
              handleDelete(folder._id)
            }}
          >
            <ImBin color="#F55050" />
          </a>
        </Button>
      ))}
    </div>
  )
}