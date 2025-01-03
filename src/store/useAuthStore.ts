import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  username: string | null
  setToken: (token: string) => void
  setUsername: (username: string) => void
  clearAuth: () => void
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      username: null,
      setToken: (token) => set({ token }),
      setUsername: (username) => set({ username }),
      clearAuth: () => set({ token: null, username: null }),
    }),
    {
      name: 'auth-storage', // Key for localStorage
    }
  )
)

export default useAuthStore
