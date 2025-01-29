import axios from 'axios'
import { Backend_Url } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const API_URL = `${Backend_Url}/api/v1/stylists/`

const viewStylistProfile = async (id: string) => {
  const token = await AsyncStorage.getItem('token')
  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.get(API_URL + id + '/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  return response.data
}

const viewAllStylistProfile = async () => {}

export const profileService = {
  viewStylistProfile
}
