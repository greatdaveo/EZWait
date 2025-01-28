import axios from 'axios'
import { Backend_Url } from '@env'
import { BookingData } from './bookingSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const API_URL = `${Backend_Url}/api/v1/customer`

const getAllBookings = async () => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.get(API_URL + '/view/all-stylists', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  //   console.log('getAllBookings service data: ', response.data)

  return response.data
}

const makeBooking = async (formData: BookingData) => {
  const response = await axios.post(API_URL + '/bookings', formData, {
    withCredentials: true
  })
  return response.data
}

const editBooking = async (id: string) => {
  const response = await axios.put(API_URL + '/edit/bookings' + id)
  return response.data
}

const deleteBooking = async (id: string) => {
  const response = await axios.delete(API_URL + '/delete/booking' + id)
  return response.data
}

export const bookingService = {
  getAllBookings,
  makeBooking,
  editBooking,
  deleteBooking
}
