import axiosInstance from "../axiosInstance"


interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  username: string
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  const response = await axiosInstance.post('/api/auth/login', payload)
  return response.data
}

export const register = async (payload: RegisterPayload) => {
  const response = await axiosInstance.post('/api/auth/register', payload)
  return response.data
}


export const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.post('/api/auth/validate', { token })
      return response.data.valid // Backend should return a `valid` boolean
    } catch (error: any) {
      console.error('Token validation failed:', error.response?.data || error.message)
      return false
    }
  }