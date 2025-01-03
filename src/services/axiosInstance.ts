import axios from 'axios'
import useAuthStore from '@/store/useAuthStore'

const BASE_URL = 'https://temp.apgyc.in'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to add token from Zustand state khgjbkj
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token // Retrieve token from Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor (optional, e.g., for global error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (optional)
    return Promise.reject(error)
  }
)

export default axiosInstance
