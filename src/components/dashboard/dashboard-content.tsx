'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import CreateFormModal from './create-form-modal'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/services/axiosInstance'
import { toast } from 'react-toastify'
import { ImBin } from 'react-icons/im'
import DeleteFormModal from './delete-form-modal'

export interface Form {
  id: string
  _id: string
  name: string
  submissions: number
  createdAt: string
}

export default function DashboardContent({ folderId }: { folderId: string | null }) {
  const router = useRouter()

  const [forms, setForms] = useState<Form[]>([])
  const [isCreateFormModalOpen, setCreateFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)

  const fetchForms = async () => {
    try {
      const response = await axiosInstance.get(`/api/forms/folder/${folderId}`)
      setForms(response.data.forms)
    } catch (error) {
      console.error('Error fetching forms:', error)
    }
  }

  const openDeleteModal = (formId: string) => {
    setSelectedFormId(formId)
    setDeleteModalOpen(true)
  }

  // Fetch forms on folder change
  useEffect(() => {
    if (!folderId) {
      setForms([])
      return
    }
    fetchForms()
   
  }, [folderId])

  const handleClick = (id: string) => {
    router.push(`/${id}/flow`)
  }

  const handleCreateForm = async (form: { name: string }) => {
    if (!folderId) {
      toast.warn('Please select or create a folder first.')
      return
    }
    try {
      const response = await axiosInstance.post('/api/forms', { ...form, folderId })
      console.log('Form created:', response.data.form)
      fetchForms()
      // setForms([...forms, response.data.form])
    } catch (error) {
      console.error('Error creating form:', error)
    }
  }

  const handleDeleteForm = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this form?')
    if (!confirmed) return

    try {
      console.log('Deleting form:', id)
      await axiosInstance.delete(`/api/forms/${id}`)
      // setForms(forms.filter((form) => form._id !== id))
      fetchForms()
      toast.success('Form deleted successfully!')
    } catch (error) {
      console.error('Error deleting form:', error)
      toast.error('Failed to delete the form.')
    }
  }
  const handleConfirmDelete = async () => {
    if (selectedFormId) {
      // Call delete form API here
     
      

      try {
        
        await axiosInstance.delete(`/api/forms/${selectedFormId}`)
        // setForms(forms.filter((form) => form._id !== id))
        fetchForms()
        toast.success('Form deleted successfully!')
      } catch (error) {
        console.error('Error deleting form:', error)
        toast.error('Failed to delete the form.')
      }finally{
        setDeleteModalOpen(false)
      setSelectedFormId(null)

      }
    }
  }

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Button
          style={{
            backgroundColor: 'var(--button)',
            border: 'none',
            padding: '0.5rem 1rem',
            maxWidth: '250px',
            maxHeight: '300px',
            width: '250px',
            height: '300px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
          onClick={() => setCreateFormModalOpen(true)}
        >
          <Plus size={38} />
          Create a typebot
        </Button>

        {forms.map((form) => (
          <div
            key={form.id} // Ensure the key is unique
            onClick={() => handleClick(form.id)}
            style={{
              position: 'relative',
              backgroundColor: 'var(--button2)',
              color: 'var(--primary)',
              padding: '16px',
              maxWidth: '250px',
              maxHeight: '300px',
              width: '250px',
              height: '300px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '12px',
            }}
          >
            <ImBin
              color="#F55050"
              size={20}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation() // Prevent triggering parent click
                openDeleteModal(form.id)
              }}
            />
            <h3 className="text-base sm:text-lg">{form.name}</h3>
            <p className="text-sm sm:text-base">{form.submissions} submissions</p>
            <p className="text-sm sm:text-base">{form.createdAt}</p>
          </div>
        ))}
      </div>
      <CreateFormModal
        handleCreateForm={handleCreateForm}
        isOpen={isCreateFormModalOpen}
        onClose={() => setCreateFormModalOpen(false)}
      />

<DeleteFormModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  )
}
