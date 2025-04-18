import axios from 'axios'
import { Backend_Url } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const API_URL = `${Backend_Url}/api/v1/`

const viewStylistProfile = async (id: string) => {
  const token = await AsyncStorage.getItem('token')
  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.get(API_URL + 'stylists/' + id + '/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  // console.log('viewStylistProfile: ', response.data)

  return response.data
}

const viewAllStylistProfile = async () => {
  const token = await AsyncStorage.getItem('token')
  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.get(API_URL + 'customer/view/all-stylists', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  // console.log('viewAllStylistProfile: ', response.data)

  return response.data
}

const editStylistProfile = async (id: string) => {
  const token = await AsyncStorage.getItem('token')
  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.patch(API_URL + 'stylists/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  console.log('editAndUpdateStylistProfile: ', response.data)

  return response.data
}

const updateStylistProfile = async (id: string, formData: any) => {
  const token = await AsyncStorage.getItem('token')
  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  console.log(formData)

  const response = await axios.patch(API_URL + 'stylists/' + id, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })

  console.log('UpdateStylistProfile: ', response.data)

  return response.data
}

export const profileService = {
  viewStylistProfile,
  viewAllStylistProfile,
  editStylistProfile,
  updateStylistProfile
}
