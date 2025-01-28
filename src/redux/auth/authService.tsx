import axios from 'axios'
import { Backend_Url } from '@env'
import { LoginData, UserData } from './authSlice'
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

const authService = {
  registerService,
  loginService,
  logoutService
}

export default authService
