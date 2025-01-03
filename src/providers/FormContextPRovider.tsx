"use client"
import axiosInstance from '@/services/axiosInstance';
import { createContext, useContext, useState } from 'react';

interface Node {
    id: number
    x: number
    y: number
    text: string
    type:
      | 'text'
      | 'image'
      | 'video'
      | 'gif'
      | 'number'
      | 'email'
      | 'phone'
      | 'date'
      | 'rating'
      | 'button'
    category: 'bubbles' | 'inputs'
    content?: string
  }
interface FormContextType {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  saveForm: (formName: string, formDescription: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [nodes, setNodes] = useState<Node[]>([]);

  const saveForm = async (formName: string, formDescription: string) => {
    try {
      const serializedQuestions = nodes.map((node) => ({
        type: node.type,
        label: node.text || 'Untitled',
        placeholder: node.content || '',
        options: [], // Enhance for dropdown, etc.
        required: false, // Default
      }));

      // Replace folderId with your dynamic folder logic
    //   const folderId = 'some-folder-id';
      await axiosInstance.post('/api/forms', {
        name: formName,
        description: formDescription,
        questions: serializedQuestions,
        // folderId,
      });

      alert('Form saved successfully!');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form. Please try again.');
    }
  };

  return (
    <FormContext.Provider value={{ nodes, setNodes, saveForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used within FormProvider');
  return context;
};
