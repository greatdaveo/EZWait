import axios from 'axios'
import { Backend_Url } from '@env'
import { LoginData, PasswordData, UserData, UserProfile } from './authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const API_URL = `${Backend_Url}/api/v1/user`
console.log(API_URL)

// For registration
const registerService = async (userData: UserData) => {
  const response = await axios.post(API_URL + '/register', userData, {
    withCredentials: true
  })

  return response.data
}

// For Login
const loginService = async (userData: LoginData) => {
  const response = await axios.post(API_URL + '/login', userData, {
    withCredentials: true
  })
  // console.log('Login Data: ', response.data)
  const { data, token } = response.data
  await AsyncStorage.setItem('token', token)
  // console.log(data)
  return data
}

// To logout
const logoutService = async () => {
  const response = await axios.post(API_URL + '/logout')
  return response.data
}

const deleteAccountService = async () => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }
  const response = await axios.delete(API_URL + '/delete-account', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })
  return response.data
}

const changePasswordService = async (passwordData: PasswordData) => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.put(API_URL + '/change-password', passwordData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  return response.data
}

const editUserProfileService = async (userData: UserProfile) => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.put(API_URL + '/edit', userData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  return response.data
}

const authService = {
  registerService,
  loginService,
  logoutService,
  deleteAccountService,
  changePasswordService,
  editUserProfileService
}

export default authService
