import axios from 'axios'
import { Backend_Url } from '@env'
import { BookingData } from './bookingSlice'

export const API_URL = `${Backend_Url}/api/v1/customer`

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
  makeBooking,
  editBooking,
  deleteBooking
}
