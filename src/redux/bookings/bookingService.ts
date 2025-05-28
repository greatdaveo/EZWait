import axios from 'axios'
import { Backend_Url } from '@env'
import { BookingData } from './bookingSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_URL = `${Backend_Url}/api/v1`
// console.log('BookingService: ', API_URL)

const getAllBookings = async () => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.get(API_URL + '/view-all/bookings', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  // console.log('getAllBookings service data: ', response.data)

  return response.data
}

const getSingleBooking = async (bookingId: any) => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.get(API_URL + '/view/bookings/' + bookingId, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })

  // console.log('getSingleBookings service data: ', response.data)

  return response.data
}

const makeBooking = async (formData: BookingData) => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.post(API_URL + '/customer/bookings', formData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
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

const updateBookingStatus = async (id: string, newStatus: string) => {
  const token = await AsyncStorage.getItem('token')

  if (!token) {
    throw new Error('No token found. User is not authenticated.')
  }

  const response = await axios.patch(
    `${API_URL}/bookings/${id}/status`,
    {
      new_status: newStatus
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }
  )

  return response.data
}

export const bookingService = {
  getAllBookings,
  getSingleBooking,
  makeBooking,
  editBooking,
  deleteBooking,
  updateBookingStatus
}
