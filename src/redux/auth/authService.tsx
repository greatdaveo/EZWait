import axios from 'axios'
import { Backend_Url } from '@env'
import { LoginData, UserData } from './authSlice'

const Backend_url = Backend_Url
export const API_URL = `${Backend_Url}/api/v1/user/register`

// For registration
const registerService = async (userData: UserData) => {
  const response = await axios.post(API_URL + '/register', userData, {
    withCredentials: true
  })

  return response.data
}

// For Login
const loginService = async (userData: LoginData) => {
  const response = await axios.post(API_URL + '/login', userData)
  return response.data
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
