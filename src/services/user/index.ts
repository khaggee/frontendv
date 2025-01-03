import axiosInstance from "../axiosInstance"


interface UpdateUserData {
  name?: string
  email?: string
  password?: string
}

export const updateUser = async (data: UpdateUserData) => {
  const response = await axiosInstance.put('/api/user/update', data)
  return response.data
}


export const getUserDetails = async () => {
    const response = await axiosInstance.get('/api/user/details')
    return response.data
  }